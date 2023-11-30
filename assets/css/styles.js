import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  titulo: {
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  subtitulo:{
    textAlign: 'left',
    fontSize: 15,
    marginBottom: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#222',
    margin: 10,
    fontSize: 15,
    padding: 10,
  },
  containerA: {
    backgroundColor: 'lightgrey',
    marginLeft: 5,
    marginTop: 5,
    width: 150,
    height: 150,
    borderRadius: 5,
    paddingBottom: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  salvar: {
    marginTop: 10,
  },
  pokemonInfo: {
    marginRight: 10, // ou qualquer outra margem que você desejar
  },
  squadContainer: {
    marginBottom: 20,
  },
  squadName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pokemonContainer: {
    marginRight: 20,
  },
  pokemonName: {
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,  
  },
  checkboxText: {
    paddingLeft: 10,
  },
  check:{
    borderRadius: 50,
  },
  divider: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export {styles};