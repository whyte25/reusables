"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { SingleImageDropzone } from "../reusables/single-image-upload"
import { toast } from "../reusables/ui/notify"

type FormValues = z.infer<typeof formSchema>

const formSchema = z.object({
  image: z.string().min(1, "Image is required"),
  name: z.string().min(2).max(50),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price"),
  description: z.string(),
})

export default function SingleImageUploadFormDemo() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: "",
    },
  })

  const fileUpload = useFileUpload({
    onSuccess: (url: string) => {
      form.setValue("image", url, { shouldValidate: true })
      toast.success("Image uploaded successfully")
    },
    onError: (error) => toast.error(error),
  })

  async function onSubmit() {
    toast.promise(() => new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Creating product...",
      success: () => "Product created successfully!",
      error: "Failed to create product",
    })

    form.reset({
      name: "",
      price: "",
      description: "",
      image: "",
    })
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="29.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <SingleImageDropzone
                      width="100%"
                      height="240px"
                      value={field.value}
                      disabled={fileUpload.isUploading}
                      progress={fileUpload.progress}
                      progressType="circular"
                      onChange={async (file: File | undefined) => {
                        if (file) {
                          await fileUpload.handleFileUpload(file)
                        } else {
                          form.setValue("image", "", { shouldValidate: true })
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a product image (PNG, JPG, WEBP)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
