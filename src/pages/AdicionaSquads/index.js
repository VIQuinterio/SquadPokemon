import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, CheckBox, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../../assets/css/styles';
import { RadioButton } from 'react-native-paper';

function AdicionaSquads({ route }) {
  const { pokemon } = route.params;
  const [selectedSquad, setSelectedSquad] = useState('');
  const [newSquadName, setNewSquadName] = useState('');
  const [allSquads, setAllSquads] = useState([]);

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
  }, []);

  const adicionarAoSquadExistente = async () => {
  try {
    if (!selectedSquad) {
      alert('Selecione um Squad existente.');
      return;
    }

    const squadAtual = await AsyncStorage.getItem(selectedSquad);
    const squadAntigo = squadAtual ? JSON.parse(squadAtual) : [];

    const novoSquad = squadAntigo.concat(pokemon);
    await AsyncStorage.setItem(selectedSquad, JSON.stringify(novoSquad));

    // Recarrega a lista de squads após adicionar um novo
    carregarSquads();

    // Atualiza o estado selectedSquad após recarregar os squads
    setSelectedSquad(selectedSquad);
  } catch (error) {
    console.error('Erro ao adicionar ao squad existente', error.message);
  }
};

  const criarNovoSquad = async () => {
    try {
      if (!newSquadName) {
        alert('Informe um nome para o novo Squad.');
        return;
      }

      const novoSquad = [pokemon];
      await AsyncStorage.setItem(newSquadName, JSON.stringify(novoSquad));

      // Recarrega a lista de squads após adicionar um novo
      carregarSquads();

      // Atualiza o estado selectedSquad após recarregar os squads
      setSelectedSquad(newSquadName);
    } catch (error) {
      console.error('Erro ao criar novo squad', error.message);
    }
  };


  return (
    <View>      
      <Text style={styles.titulo}>Crie um novo Squad:</Text>
      <TextInput
        placeholder="Nome do novo Squad"
        value={newSquadName}
        onChangeText={(texto) => setNewSquadName(texto)}
        style={styles.input}
      />
      <View style={styles.appButtonContainer}>
        <Button style={styles.appButtonText} title="Criar Novo Squad" onPress={() => criarNovoSquad()} />
      </View>
      
      <Text style={styles.subtitulo}>Squad Atual:</Text>
      <FlatList
        data={selectedSquad ? [selectedSquad] : []}
        renderItem={({ item }) => (
          <Text key={item}>{item}</Text>
        )}
        keyExtractor={(item) => item}
      />

      <Text style={styles.divider}>OU</Text>
      
      <Text style={styles.titulo}>Escolha um Squad existente:</Text>
      <FlatList
        data={allSquads}
        renderItem={({ item }) => (
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={selectedSquad === item.nome}
              onValueChange={() => setSelectedSquad((prevSelectedSquad) => (prevSelectedSquad === item.nome ? '' : item.nome))}
            />
            <Text style={styles.checkboxText}>{item.nome}</Text>
          </View>
        )}
        keyExtractor={(item) => item.nome}
      />

      <View style={styles.appButtonContainer}>
        <Button style={styles.appButtonText} title="Adicionar ao Squad Existente" onPress={() => adicionarAoSquadExistente()} />
      </View>
    </View>
  );
}
export default AdicionaSquads;