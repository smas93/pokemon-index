import { useState, useRef } from "react";
import { Autocomplete, Loader, Alert, Title } from "@mantine/core";
import { PokemonCard } from "./PokemonCard";
import { IconAlertCircle } from "@tabler/icons-react";

const fetchPokemonList = async (searchTerm: string): Promise<string[]> => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const data = await response.json();
  return data.results
    .map((pokemon: { name: string }) => pokemon.name)
    .filter((name: string) => name.startsWith(searchTerm.toLowerCase()));
};

const fetchPokemonDetails = async (pokemonName: string) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
  );
  return response.json();
};

export function AutocompleteLoading() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const timeoutRef = useRef<number>(-1);

  const handleChange = (val: string) => {
    setValue(val);
    setSelectedPokemon(null);
    setData([]);
    setError(null);

    if (!val.trim()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(async () => {
      try {
        const filteredPokemon = await fetchPokemonList(val);
        setData(filteredPokemon);
        if (filteredPokemon.length === 0) {
          setError("No Pokémon found matching your search.");
        }
      } catch {
        setError("Failed to load Pokémon data. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const handleSelect = async (pokemonName: string) => {
    setLoadingDetails(true);
    setError(null);
    try {
      const pokemonDetails = await fetchPokemonDetails(pokemonName);
      setSelectedPokemon(pokemonDetails);
    } catch {
      setError("Failed to load Pokémon details. Please try again.");
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <>
      <Title order={1}>Find your Pokémon</Title>
      <br />
      <Autocomplete
        value={value}
        data={data}
        onChange={handleChange}
        onOptionSubmit={handleSelect}
        rightSection={loading && <Loader size="1rem" />}
        placeholder="Insert Pokémon name"
      />

      {error && (
        <Alert
          icon={<IconAlertCircle size={35} />}
          title=""
          color="red"
          mt="md"
        >
          {error}
        </Alert>
      )}
      <br />
      {!loadingDetails && !loading && !error && selectedPokemon && (
        <PokemonCard pokemon={selectedPokemon} />
      )}
    </>
  );
}
