import React, { useCallback, useEffect, useState } from "react";
import {
  Center,
  Heading,
  Spinner,
  Container,
  Flex,
  Text,
  VStack,
  Spacer,
  Stack,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { QueryResponse } from "./helpers/types";
import { ArtworkContainer } from "./ArtworkContainer.tsx";
import { getFromLS, saveToLS } from "./helpers/localStorage.ts";
import { IconButton } from "@chakra-ui/react";
import { RepeatIcon, StarIcon } from "@chakra-ui/icons";

const MAX_INDEX = 471581;

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<QueryResponse | null>(null);
  const [isLiked, setIsLiked] = useState(false);
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

  const savedArtworks = getFromLS("met-liked-artworks");

  useEffect(() => {
    if (savedArtworks.includes(data?.objectID)) {
      setIsLiked(true);
    }
  }, [data?.objectID, savedArtworks]);

  const handleStarClick = useCallback(() => {
    setIsLiked(!isLiked);
    if (savedArtworks) {
      let index = savedArtworks.indexOf(data?.objectID);
      if (index === -1 && !isLiked) {
        savedArtworks.push(data?.objectID);
      } else if (index !== -1 && isLiked) {
        savedArtworks.splice(index, 1);
      }
      saveToLS("met-liked-artworks", savedArtworks);
    } else {
      saveToLS("met-liked-artworks", [data?.objectID]);
    }
  }, [data?.objectID, isLiked, savedArtworks]);

  const handleRefetchClick = useCallback(() => {
    fetchData();
    setIsLoading(true);
  }, [fetchData]);

  useEffect(() => {
    if (data == null || data.primaryImage === "") {
      fetchData();
    } else {
      setIsLoading(false);
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
            {isLoading || data == null ? (
              <Center h="500px">
                <Spinner />
              </Center>
            ) : (
              <ArtworkContainer data={data} />
            )}
          </Stack>
          <HStack height="50px" pb={4}>
            <Spacer />
            {/* {isLiked ? ( */}
            <Tooltip label="Like artwork">
              <IconButton
                aria-label="Like"
                color={isLiked ? "yellow.300" : undefined}
                icon={<StarIcon />}
                fontSize="20px"
                onClick={handleStarClick}
                variant="outlined"
              />
            </Tooltip>
            {/* ) : (
              <IconButton
                aria-label="Like"
                icon={<StarIcon />}
                // color="red"
                // fontSize="24px"
                height="24px"
                onClick={handleRefetchClick}
                variant="outlined"
              />
            )} */}
            <Tooltip label="Discover a new artwork">
              <IconButton
                aria-label="Discover a new artwork"
                colorScheme="gray"
                icon={<RepeatIcon />}
                isRound
                fontSize="24px"
                onClick={handleRefetchClick}
                variant="outlined"
              />
            </Tooltip>
          </HStack>
        </Flex>
      </Container>
    </Center>
  );
};
