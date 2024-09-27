import { Card, Image, Text, Group, Badge, Box } from "@mantine/core";
import classes from "./PokemonCard.module.css";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  weight: number;
  height: number;
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const { name, sprites, weight, height, types, abilities } = pokemon;

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={sprites.front_default} alt={name} height={250} fit="fill" />
      </Card.Section>

      <Card.Section mt="md" className={classes.section}>
        <Text fz="lg" fw={500} ta="center">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
        <Group justify="space-between" mt="md">
          <Box>
            <Text className={classes.label}>Weight:</Text>
            <Badge color="grape">{weight / 10} kg</Badge>
          </Box>
          <Box>
            <Text className={classes.label}>Height:</Text>
            <Badge color="grape">{height * 10} cm</Badge>
          </Box>
        </Group>

        <Text mt="md" className={classes.label}>
          Types:
        </Text>
        <Group>
          {types.map((type) => (
            <Badge color="orange" key={type.type.name}>
              {type.type.name}
            </Badge>
          ))}
        </Group>

        <Text mt="md" className={classes.label}>
          Abilities:
        </Text>
        <Group>
          {abilities.map((ability) => (
            <Badge color="green" key={ability.ability.name}>
              {ability.ability.name}
            </Badge>
          ))}
        </Group>
      </Card.Section>
    </Card>
  );
}
