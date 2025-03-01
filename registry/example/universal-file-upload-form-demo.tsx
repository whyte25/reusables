"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useMultipleFileUpload } from "@/hooks/use-multiple-file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { toast } from "../reusables/ui/notify"
import {
  UniversalFileUpload,
  type FileState,
} from "../reusables/universal-file-upload"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().optional(),
  files: z.array(z.string()).min(1, "At least one file is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function UniversalFileUploadFormDemo() {
  const {
    uploadMultipleFiles,
    isUploading,
    error,
    uploadProgress,
    uploadResults,
  } = useMultipleFileUpload({
    onSuccess: (urls) => {
      // Update form with uploaded URLs
      form.setValue("files", urls)
      toast.success("Files uploaded successfully!")
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      files: [],
    },
  })

  const [fileStates, setFileStates] = React.useState<FileState[]>([])

  // Update progress and completion status
  React.useEffect(() => {
    if (uploadProgress.length || uploadResults.length) {
      setFileStates((fileStates) => {
        const newFileStates = structuredClone(fileStates)

        // Update progress
        uploadProgress.forEach(({ key, progress }) => {
          const fileState = newFileStates.find(
            (fileState) => fileState.key === key
          )
          if (fileState) {
            fileState.progress = progress
          }
        })

        // Update completed files
        uploadResults.forEach(({ url, filename }) => {
          const fileState = newFileStates.find(
            (fileState) =>
              typeof fileState.file !== "string" &&
              fileState.file.name === filename
          )
          if (fileState) {
            fileState.file = url
            fileState.progress = "COMPLETE"
          }
        })

        return newFileStates
      })
    }
  }, [uploadProgress, uploadResults])

  // Update the onUpload handler
  const handleUpload = async (files: File[]) => {
    // Create file states first to show immediate preview
    const newFileStates = files.map<FileState>((file) => ({
      file,
      key: Math.random().toString(36).slice(2),
      progress: 0, // Start with 0 progress instead of PENDING
    }))

    // Update state to show previews immediately
    setFileStates((prev) => [...prev, ...newFileStates])

    // Start upload
    const filesToUpload = newFileStates.map(({ key, file }) => ({
      key,
      file: file as File,
    }))

    await uploadMultipleFiles(filesToUpload)
  }

  async function onSubmit(values: FormValues) {
    toast.promise(() => new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Creating document...",
      success: () => `Document created successfully!`,
      error: "Failed to create document",
    })
    console.log(values)
    form.reset()
    setFileStates([])
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Document</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Document" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      rows={5}
                      placeholder="Document description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem>
                  <FormLabel>Document Files</FormLabel>
                  <FormControl>
                    <UniversalFileUpload
                      value={fileStates}
                      onChange={setFileStates}
                      onUpload={handleUpload}
                      isDirectUpload
                      dropzoneOptions={{
                        maxFiles: 5,
                        maxSize: 5 * 1024 * 1024, // 5MB
                      }}
                      displayMode="list"
                      width="100%"
                      height="200px"
                      disabled={isUploading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isUploading}>
              Create Document
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
