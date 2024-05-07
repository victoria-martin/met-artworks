import React, { useCallback, useEffect, useState } from "react";
import {
  Center,
  Image,
  Heading,
  Spinner,
  Container,
  Flex,
  Text,
  Box,
  VStack,
  Spacer,
  Stack,
  Circle,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { QueryResponse } from "./helpers/types";
import { ArtworkContainer } from "./ArtworkContainer.tsx";
import { getFromLS, saveToLS } from "./helpers/localStorage.ts";
import { IconButton } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

const MAX_INDEX = 471581;

export const Home = () => {
  const [img, setImg] = useState("");
  const [refetch, setRefetch] = useState(true);
  const [data, setData] = useState<QueryResponse | null>(null);

  const getInteger = Math.floor(Math.random() * (MAX_INDEX - 0 + 1)) + 0;

  const fetchData = useCallback(() => {
    axios
      .get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${getInteger}`
      )
      .then((res) => setData(res.data))
      .catch((err) => {
        window.location.reload();
        console.error(err);
      });
  }, [getInteger]);

  useEffect(() => {
    if (data == null || data.primaryImage === "") {
      fetchData();
    }
  }, [fetchData, data]);

  return (
    <Center h="100vh" overflow="hidden">
      <Container bg="orange.50" h="100%" maxW="xl" overflowY="auto">
        <Flex direction="column" h="100%">
          <VStack justify="center" h="150px">
            <Heading>One Artwork per Day</Heading>
            <Text fontSize="xl">Metropolitan Museum of Art</Text>
          </VStack>
          <Stack flex="1">
            {data &&
            data.primaryImage !== "" &&
            Object.keys(data).length > 0 ? (
              <ArtworkContainer data={data} />
            ) : (
              <Center h="500px">
                <Spinner />
              </Center>
            )}
          </Stack>
          <HStack height="50px" pb={4}>
            <Spacer />
            <IconButton
              aria-label="Discover a new artwork"
              colorScheme="gray"
              icon={<RepeatIcon />}
              isRound
              fontSize="24px"
              onClick={() => fetchData()}
              variant="outlined"
            />
          </HStack>
        </Flex>
      </Container>
    </Center>

    // <Box h="100vh">

    //   <Flex>
    //     {/* <Flex direction="column"> */}
    //     {/* </Flex> */}
    //   </Flex>
    // </Box>
  );
};
