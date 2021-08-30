import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormControl,
  ModalBody,
  useDisclosure,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { AddIcon } from '@chakra-ui/icons';
import { createPost } from '@/lib/posts';
import { userStore } from '@/lib/store';
import { Post } from '@/lib/types';
///
interface Props {
  onSubmit: (data: Post) => void;
}
interface PostInput {
  title: string;
  body: string;
}
//
export const PostFormButton = ({ onSubmit }: Props) => {
  const user = userStore((state) => state.user);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const validate = (value: PostInput) => {
    const error: any = {};
    if (!value.title) {
      error.title = 'Title is required';
    }
    if (!value.body) {
      error.body = 'Description is required';
    }
    return error;
  };
  return (
    <div>
      <Button
        onClick={onOpen}
        leftIcon={<AddIcon />}
        bgColor="white"
        textColor="teal"
        variant="solid"
      >
        Add
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent textColor="black">
          <ModalHeader>Create post</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={6}>
            <Formik
              initialValues={{ title: '', body: '' }}
              onSubmit={async (values, actions) => {
                const errors = validate(values);
                if (Object.keys(errors).length !== 0) {
                  actions.setErrors(errors);
                  actions.setSubmitting(false);
                  return;
                }
                const result = await createPost({
                  ...values,
                  author: user?.id!,
                });
                if (result) {
                  toast({
                    title: `Post was created`,
                    status: 'success',
                    duration: 9000,
                  });
                  actions.setSubmitting(false);
                  onSubmit(result);
                  onClose();
                  return;
                }
                toast({
                  title: `Could not create post, please try again`,
                  status: 'error',
                  duration: 9000,
                });

                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="title">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.title && form.touched.title}
                      >
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                          autoComplete="off"
                          {...field}
                          id="title"
                          placeholder="Title..."
                        />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="body">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.body && form.touched.body}
                      >
                        <FormLabel htmlFor="body">Description</FormLabel>
                        <Textarea
                          autoComplete="off"
                          {...field}
                          id="body"
                          placeholder="Description..."
                        />
                        <FormErrorMessage>{form.errors.body}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    alignSelf="end"
                    mt={4}
                    mx={2}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    mt={4}
                    mx={2}
                    isLoading={props.isSubmitting}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
