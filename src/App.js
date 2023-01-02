import React, { useState } from 'react';
import {
  ChakraProvider,
  VStack,
  Grid,
  theme,
  Input,
  Heading,
  Card,
  Image,
  Stack,
  CardBody,
  Text,
  CardFooter,
  HStack,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { HiLocationMarker } from 'react-icons/hi';

const api = {
  key: 'e8be4b0ebc699ed60d6d0d33671e1f23',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Grid minH="20vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={3}>
          <Heading size={'lg'}>Weather App</Heading>
          <Input
            maxW={'80vh'}
            placeholder="Search location"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          {typeof weather.main != 'undefined' ? (
            <div>
              <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow="hidden"
                variant="outline"
                p={0}
              >
                <Image
                  objectFit="contain"
                  maxW={{ base: '100%', sm: '200px' }}
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                />

                <Stack>
                  <CardBody textAlign="right">
                    <Heading size="xl">
                      {Math.round(weather.main.temp)}°C
                    </Heading>
                    <Text py="1" fontSize={'lg'}>
                      {weather.weather[0].main}
                    </Text>
                  </CardBody>

                  <CardFooter>
                    <HStack>
                      <HiLocationMarker />
                      <Text fontSize={'md'}>{weather.name}</Text>
                    </HStack>
                  </CardFooter>
                </Stack>
              </Card>
            </div>
          ) : (
            ''
          )}
        </VStack>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
