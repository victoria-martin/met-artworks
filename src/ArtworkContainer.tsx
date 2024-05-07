import React, { useEffect } from "react";
import { QueryResponse } from "./helpers/types";
import {
  Box,
  Image,
  Text,
  VStack,
  Center,
  HStack,
  Badge,
} from "@chakra-ui/react";

type Props = {
  data: QueryResponse;
};

export const ArtworkContainer = ({ data }: Props) => (
  <VStack h="100%" justify="space-around">
    <VStack justify="center">
      <Image align="flex-end" src={data.primaryImageSmall} maxH="400px" />
      {data.measurements &&
        data.measurements[0].elementMeasurements.Width &&
        data.measurements[0].elementMeasurements.Height && (
          <Center>
            <Text>
              {data.measurements[0].elementMeasurements.Width}cm x{" "}
              {data.measurements[0].elementMeasurements.Height}cm (w x h)
            </Text>
          </Center>
        )}
    </VStack>

    <VStack justify="center" px={8}>
      <Text>{data.title}</Text>
      <Text>{data.medium}</Text>
      <Text>{data.objectDate}</Text>
    </VStack>
    {data.tags && (
      <HStack>
        {data.tags.map((e) => (
          <Badge>{e.term}</Badge>
        ))}
      </HStack>
    )}
  </VStack>
);
