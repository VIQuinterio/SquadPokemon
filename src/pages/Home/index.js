import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import api from '../../services/api';
import {styles} from '../../../assets/css/styles';

function Home() {
  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchedPokemon, setSearchedPokemon] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => consultaId(item.id)}>
      <Card style={styles.containerA}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text>{item.name}</Text>
      </Card>
    </TouchableOpacity>
  );

  const consultaId = async (pokemonId) => {
    try {
      const response = await api.get(`pokemon/${pokemonId}`);
      const data = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.front_default,
      };
      setSearchedPokemon(() => data); // Usar uma função de callback para garantir a atualização correta
    } catch (error) {
      console.error('Erro ao consultar o Pokémon', error.message);
      setSearchedPokemon(null);
    }
  };

  const searchPokemon = async () => {
    try {
      if (id.trim() === '') {
        setFilteredPokemons(pokemons);
        setSearchedPokemon(null); // Limpar o estado quando nenhum Pokémon é pesquisado
      } else {
        const response = await api.get(`pokemon/${id.toLowerCase()}`);
        const data = {
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.front_default,
        };

        // Limpar a lista antes de adicionar o Pokémon pesquisado
        setFilteredPokemons(null);
        setSearchedPokemon(data); // Atualizar o estado para exibir informações sobre o Pokémon pesquisado        
      }
    } catch (error) {
      console.error('Erro ao consultar o Pokémon', error.message);
      setFilteredPokemons([]); // Limpar a lista se ocorrer um erro na pesquisa
      setSearchedPokemon(null);
    }
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await api.get('pokemon?limit=1017'); // Ajuste o limite conforme necessário
        const data = response.data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
        setPokemons(data);
        setFilteredPokemons(data);
      } catch (error) {
        console.error('Erro ao buscar a lista de Pokémon', error.message);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <View style={styles.container}>    
      <Text style={styles.titulo}>Qual Pokémon está procurando?</Text>
      <TextInput
        value={id}
        onChangeText={(texto) => setId(texto)}
        underlineColorAndroid="transparent"
        placeholder="Procure o Pokémon por nome"
        style={styles.input}
      />
      <Button title="Consultar" onPress={() => searchPokemon()} />
      {searchedPokemon && (
        <View style={styles.containerImg}>
          <Image source={{ uri: searchedPokemon.image }} style={styles.image} />
          <Text style={styles.pokemonInfo}>{searchedPokemon.name}</Text>
          <Button
            style={styles.salvar}
            title="Adicionar ao squad"
            onPress={() => navigation.navigate('AdicionaSquads', { pokemon: searchedPokemon, squadNome: 'meuSquad' })}
          />
        </View>
      )}
      <FlatList
        data={filteredPokemons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default Home;