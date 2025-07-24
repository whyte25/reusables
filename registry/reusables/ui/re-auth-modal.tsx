// 'use client';
// import { Button } from '@/components/ui/button';
// import { ConfirmModal } from '@/components/ui/confirm-modal';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { InputOTP } from '@/components/ui/input-otp';
// import { PinSchema, PinSchemaType } from '@/features/auth/validation';
// import { zodResolver } from '@hookform/resolvers/zod';

// import { ChevronRight, Trash2 } from 'lucide-react';
// import { useForm } from 'react-hook-form';

// export const ReAuthUser = () => {
//   const form = useForm<PinSchemaType>({
//     resolver: zodResolver(PinSchema),
//     mode: 'onChange',
//     reValidateMode: 'onChange',
//     defaultValues: {
//       pin: '',
//     },
//   });

//   const handleDelete = () => {
//     // Handle delete account logic
//   };

//   return (
//     <ConfirmModal
//       title="Delete Account"
//       description="Are you sure you’d want to delete your Squareme account. This action is irreversible"
//       onConfirm={handleDelete}
//       trigger={
//         <Button
//           variant={'ghost'}
//           className={'flex h-12 w-full justify-start gap-3 px-1'}
//         >
//           <Trash2 className="size-6 text-secondary" />
//           <p className="text-sm text-primary">Delete Account</p>
//           <ChevronRight className="ml-auto h-4 w-4" />
//         </Button>
//       }
//       dialogContentClassName="gap-3"
//     >
//       <Form {...form}>
//         <form
//           className="flex h-full w-full flex-col justify-between"
//           onSubmit={form.handleSubmit(handleDelete)}
//         >
//           <FormField
//             control={form.control}
//             name="pin"
//             render={({ field }) => (
//               <FormItem className="flex flex-col items-center">
//                 <FormLabel className="text-sm font-normal text-muted-foreground">
//                   To confirm please type in your security PIN
//                 </FormLabel>
//                 <FormControl>
//                   <InputOTP
//                     maxLength={6}
//                     field={field}
//                     className="mx-auto w-fit"
//                     // isVerifying={isVerifying}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </form>
//       </Form>
//     </ConfirmModal>
//   );
// };
