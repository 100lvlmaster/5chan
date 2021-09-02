import {
  Flex,
  Text,
  Box,
  Divider,
  Textarea,
  Button,
  Spinner,
  Center,
  useToast,
  Spacer,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { Container } from '@/layout/container';
import useSWR from 'swr';
import { deletePost, fetchPostById } from '@/lib/posts';
import { postReply } from '@/lib/replies';
import { useState, useRef } from 'react';
import { userStore } from '@/lib/store';

///
export default function PostPage() {
  const [value, setValue] = useState('');
  const user = userStore((state) => state.user);
  const toast = useToast();
  const router = useRouter();
  ///
  const { id } = router.query;
  const postApiUrl = `${process.env.NEXT_PUBLIC_API_URL!}/api/v1/posts/${id}`;
  const {
    data: post,
    mutate,
    isValidating,
  } = useSWR(postApiUrl, fetchPostById);
  ///

  const handleInputChange = (e: any): void => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  const onSubmit = async (): Promise<void> => {
    if (user && value) {
      const result = await postReply({
        body: value,
        author: user.id,
        postId: id as string,
      });
      setValue('');
      if (!result) {
        toast({
          title: 'Could not reply',
          status: 'error',
          duration: 2000,
        });
        return;
      }
      mutate({ ...post!, replies: [...post!.replies!, result] });
      toast({
        title: 'Reply created',
        status: 'success',
        duration: 2000,
      });
    }
  };
  const onDeleteHandler = async (): Promise<void> => {
    const wasDeleted = await deletePost(postApiUrl);
    if (wasDeleted) {
      toast({
        title: 'Post deleted sucessfully',
        status: 'success',
        duration: 2000,
      });

      router.push('/home');
      return;
    }
    toast({
      title: 'Coult not delete post, please try again later',
      status: 'error',
      duration: 2000,
    });
    return;
  };
  ///
  return (
    <Container title={'Post'}>
      {!isValidating && post ? (
        <Box position="sticky" p="10">
          <Text fontWeight="bold" fontSize="xl">
            {post?.title}
          </Text>
          <Text fontSize="md">{post?.body}</Text>
          <Text textAlign="right" fontSize="xs">
            ~{post?.author}
          </Text>
          {user?.id === post.author ? (
            <Flex w="full" flexDir="row" experimental_spaceX="3" py="2">
              <Spacer />
              <EditIcon />
              <CustomDeleteButton onDelete={onDeleteHandler} />
            </Flex>
          ) : (
            ''
          )}
        </Box>
      ) : (
        <Center p="20">
          <Spinner />
        </Center>
      )}
      <Divider />
      <Box
        px="10"
        py="5"
        experimental_spaceY="2"
        alignContent="end"
        alignItems="end"
        flexDir="column"
        placeContent="end"
      >
        <Textarea
          borderRadius="lg"
          value={value}
          onChange={handleInputChange}
          placeholder="Write something ..."
          size="sm"
          type="submit"
        />
        <Button
          onClick={onSubmit}
          alignSelf="end"
          placeSelf="end"
          type="submit"
        >
          Submit
        </Button>
      </Box>

      <Flex
        flexDir="column"
        align="stretch"
        px="10"
        py="5"
        experimental_spaceY="5"
      >
        {!isValidating ? (
          post?.replies?.map((e) => (
            <Box key={e.ID} borderWidth="1" borderColor="gray">
              <Text fontSize="x-small">{e.author}</Text>
              <Text fontSize="md">{e.body}</Text>
              <Divider borderColor="gray.300" py="2" />
            </Box>
          ))
        ) : (
          <Center>
            <Spinner size="xl" />
          </Center>
        )}
      </Flex>
    </Container>
  );
}

const CustomDeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  return (
    <>
      <DeleteIcon color="red" onClick={() => setIsOpen(true)} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay textColor="black">
          <AlertDialogContent>
            <AlertDialogHeader textColor="teal" fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
