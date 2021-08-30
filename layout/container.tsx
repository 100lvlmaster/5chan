import { userStore } from '@/lib/store';
import { getUser } from '@/lib/user';
import { Flex, Spacer, Text, Avatar } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useEffect } from 'react';
///
interface Props {
  children: JSX.Element | JSX.Element[];
  title?: string;
  navTrailing?: JSX.Element;
}
export const Container = ({ children, title, navTrailing }: Props) => {
  const [user, setUser] = userStore((state) => [state.user, state.setUser]);
  useEffect(() => {
    initUser();
    console.log(`Have a nice day 🔥`);
  }, []);
  const initUser = async (): Promise<void> => {
    if (!user) {
      const user = await getUser();
      setUser(user);
    }
  };
  return (
    <Flex
      flexDir="column"
      h="screen"
      w="full"
      align="stretch"
      textColor="black"
    >
      <Head>
        <link rel="icon" href="favicon.png" />
      </Head>
      <Flex
        flexDir="row"
        px="5"
        py="3"
        textColor="white"
        alignItems="center"
        bgColor="teal"
        experimental_spaceX="2"
      >
        <NextLink href="/home">
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
        </NextLink>
        <Spacer />
        <Text fontWeight="bold" fontSize="lg">
          {title ?? ''}
        </Text>
        <Spacer />
        {navTrailing ? navTrailing : ''}

        {user ? <Avatar src={user.avatar} alt={`avatar.png`} /> : ``}
      </Flex>
      {children}
    </Flex>
  );
};
