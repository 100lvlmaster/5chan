import {
  Flex,
  Spacer,
  Text,
  Button,
  Center,
  Box,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Container } from '@/layout/container';
import NextLink from 'next/link';
export default function Home() {
  return (
    <Container>
      <Flex
        align="center"
        flexDir="column"
        p="20"
        alignContent="center"
        placeContent="center"
      >
        <Box p="10">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
          >
            <path d="M13 24h-2l-.001-9.818-5.216-3.804.008-.011-.005-.004-.589.809 4.811 3.498-.009 4.139c-4.561-.881-7.999-4.717-7.999-9.309 0-5.243 4.481-9.5 10-9.5s10 4.257 10 9.5c0 4.592-3.436 8.427-7.997 9.309l-.01-4.139 4.81-3.498-.588-.809-.001.001.01.014-5.225 3.81.001 9.812zm-.001-14.01l.004 2.958.997-.727-.007-1.748 3.015-2.193-.589-.808-.005.003.001.001-3.416 2.514zm-2-.006l-2.927-2.155-.491-.357-.588.808 3.014 2.193-.006 1.743.997.727.001-2.959zm2-3.8l.003 2.563.997-.735-.005-1.321 1.213-.859-.578-.816v.001l-1.63 1.167zm-2-.006l-1.628-1.162-.578.816 1.213.859-.005 1.316.998.735v-2.564z" />
          </svg>
        </Box>
        <Text fontWeight="black" fontSize="5xl">
          5chan
        </Text>
        <Text fontSize="xl">The 4chan clone with a one up.</Text>
        <NextLink href="/home">
          <a>
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" m="10">
              Get started
            </Button>
          </a>
        </NextLink>
        <Box py="20">
          <Text fontWeight="bold" fontSize="lg" textAlign="left">
            How to use (for dummies):
          </Text>
          <OrderedList p="2" fontSize="md">
            <ListItem>Press `Get started`</ListItem>
            <ListItem>Open a thread post or create one</ListItem>
            <ListItem>Reply to posts or read replies</ListItem>
            <ListItem flexDir="row">
              Be anonymous. Be sus. <Text as="em">hmmmmmmmmmm</Text>
            </ListItem>
          </OrderedList>
        </Box>
      </Flex>
      <Spacer></Spacer>
      <Center>
        <Flex align="center" flexDir="row">
          <Text>Made with ❤️ by</Text>
          <a href="https://100lvlmaster.in">
            <Text decoration="underline">100lvlmaster</Text>
          </a>
        </Flex>
      </Center>
    </Container>
  );
}
