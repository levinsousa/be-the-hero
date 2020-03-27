import React , { useState , useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { View , FlatList , Image , Text , TouchableOpacity } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'


import logoImage from '../../assets/logo.png'

export default function Incidents(){
  const [incidents , setIncidents] = useState([])
  const [total , setTotal] = useState(0)
  const [pages , setPages] = useState(1)
  const [loading , setLoading] = useState(false)

  if(loading){
    return
  }

  if(total > 0 && incidents.length === total){
    return
  }

  setLoading(true)

  async function loadIncidents(){ 
    const response = await api.get('incidents', {
      params: { pages }
    })

    setIncidents([...incidents,...response.data])
    setTotal(response.headers['x-total-count'])
    setPages(pages + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadIncidents()
  } , [])

  const navigation = useNavigation();

  function navigateToDetail(incident){
    navigation.navigate('Detail', { incident });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImage}/>
        <Text style={styles.headerText}>
        Total de <Text style={styles.headerTextBold}>{total}</Text> casos
        </Text>
      </View>
      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

      <FlatList 
      data={incidents}
      style={styles.incidentsList}
      keyExtractor={incident => String(incident.id)}
      showsVerticalScrollIndicator={false}
      onEndReached={loadIncidents}
      onEndReachedThreshold={0.2}
      renderItem={({ item: incident }) => (
        <View style={styles.incidents}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', { style: 'currency' , currency: 'BRL' })
            .format(incident.value)}
          </Text>

          <TouchableOpacity 
          style={styles.detailsButton} 
          onPress={() => navigateToDetail(incident)}
          >
            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
            <Feather name='arrow-right' size={16} color='#e02041'/>
          </TouchableOpacity>
        </View>
      )}
      />

    </View>
  )
}