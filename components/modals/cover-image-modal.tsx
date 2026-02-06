"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
    const [isUploaded, setIsUploaded] = useState(false);

    const params = useParams();
    const update = useMutation(api.documents.update);
    const coverImage = useCoverImage();
    const { edgestore } = useEdgeStore();

    // Fetch the current document to check if it has a cover image
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    });

    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [progress, setProgress] = useState(0);

    // Check if document already has a cover image
    const hasCoverImage = !!document?.coverImage;

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        setProgress(0);
        coverImage.onClose();
    }

    const onUpload = async () => {
        if (!file) return;

        setIsSubmitting(true);

        try {
            // If there's an existing cover image, delete it first
            if (hasCoverImage && document?.coverImage) {
                await edgestore.publicFiles.delete({
                    url: document.coverImage
                });
            }

            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                    setProgress(progress);
                },
            });

            await update({
                id: params.documentId as Id<"documents">,
                coverImage: res.url
            });

            setIsUploaded(true);
            setFile(undefined);

            onClose();
        } catch (error) {
            console.error("Upload failed:", error);
            setIsSubmitting(false);
        }
    }

    const onRemove = async () => {
        if (!document?.coverImage) return;

        setIsSubmitting(true);

        try {
            // Remove from edgestore
            await edgestore.publicFiles.delete({
                url: document.coverImage
            });

            // Update document to remove cover image
            await update({
                id: params.documentId as Id<"documents">,
                coverImage: undefined
            });

            onClose();
        } catch (error) {
            console.error("Remove failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-lg font-semibold">
                        {hasCoverImage ? "Change Cover Image" : "Add Cover Image"}
                    </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                    {/* Show existing cover image if it exists */}
                    {hasCoverImage && (
                        <div className="relative">
                            <img
                                src={document.coverImage}
                                alt="Current cover"
                                className="w-full h-48 object-cover rounded-md"
                            />
                        </div>
                    )}

                    {/* File Input */}
                    <div className="flex flex-col items-center gap-4">
                        <input
                            id="cover-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setFile(e.target.files?.[0]);
                            }}
                            disabled={isSubmitting}
                            className="hidden"
                        />
                        
                        {/* Custom button that triggers the file input */}
                        <label
                            htmlFor="cover-image-upload"
                            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                        >
                            {file ? file.name : hasCoverImage ? "Choose New File" : "Choose File"}
                        </label>
                        
                        {/* Progress Display */}
                        {isSubmitting && (
                            <div className="w-full">
                                <div className="text-sm text-muted-foreground text-center mb-2">
                                    {hasCoverImage ? "Changing..." : "Uploading..."} {progress}%
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div 
                                        className="bg-primary h-2 rounded-full transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* New Image Preview */}
                        {file && !isSubmitting && (
                            <div className="relative">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between">
                        <div>
                            {hasCoverImage && (
                                <Button
                                    variant="destructive"
                                    onClick={onRemove}
                                    disabled={isSubmitting}
                                    size="sm"
                                >
                                    {isSubmitting ? "Removing..." : "Remove Cover"}
                                </Button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={onUpload}
                                disabled={!file || isSubmitting}
                            >
                                {isSubmitting ? (hasCoverImage ? "Changing..." : "Uploading...") : (hasCoverImage ? "Change" : "Upload")}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}