import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../../assets/css/styles';
import { useIsFocused } from '@react-navigation/native';

function Squad() {

  const [allSquads, setAllSquads] = useState([]);
  const isFocused = useIsFocused();

  const carregarSquads = async () => {
    try {
      const chaves = await AsyncStorage.getAllKeys();

      const squadsPromises = chaves.map(async (chave) => {
        try {
          const squad = await AsyncStorage.getItem(chave);
          const parsedSquad = JSON.parse(squad);
          return { nome: chave, pokemons: parsedSquad };
        } catch (error) {
          console.error(`Erro ao analisar JSON para a chave ${chave}:`, error.message);
          return null;
        }
      });

      const squads = await Promise.all(squadsPromises);
      setAllSquads(squads.filter((squad) => squad !== null));
    } catch (error) {
      console.error('Erro ao carregar squads salvos', error.message);
    }
  };

  useEffect(() => {
    carregarSquads();
  }, [isFocused]); // Adicionado isFocused como dependência

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('Todos os squads foram apagados!');
      console.log('AsyncStorage foi limpo com sucesso.');
    } catch (error) {
      console.error('Erro ao limpar AsyncStorage', error);
    }
  };

  return (
    <View>
      <Text style={styles.titulo}>Lista de Squads:</Text>
      <View style={styles.appButtonContainer}>
      <FlatList
        data={allSquads}
        renderItem={({ item }) => (
          <View style={styles.squadContainer}>
            <Text style={styles.squadName}>{item.nome}</Text>
            <FlatList
              showsVerticalScrollIndicator={false} // Oculta a barra de rolagem vertical
              showsHorizontalScrollIndicator={false}
              data={item.pokemons}
              horizontal
              renderItem={({ item: pokemon }) => (
                <View style={styles.pokemonContainer}>
                  <Image source={{ uri: pokemon.image }} style={styles.image} />
                  <Text style={styles.pokemonName}>{pokemon.name}</Text>
                </View>
              )}
              keyExtractor={(pokemon) => pokemon.id.toString()}
            />
          </View>
        )}
        keyExtractor={(item) => item.nome}
      />
        <View style={styles.appButtonContainer}>
          <Button style={styles.appButtonText} title="Apagar todos os Squads" onPress={() => clearStorage()} />
        </View>
      </View>
    </View>
  );
}

export default Squad;