import React,{ useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles'
import logoImg from '../../assets/logo.png'
import Feather from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import api from '../../server/api'
export default function Incidents() {

  const navigation = useNavigation()
  const [incidents, setIncidents] = useState([])
  const [ total, setTotal] = useState()
  const [ page, setPage] = useState();
  const [ loading, setLoading] = useState(false)

  function navigationToDetails(incident){
    navigation.navigate('detail',{incident})
  }
  async function loadIncidents(){
    if(loading){
      return;
    }
    if(total > 0 && incidents.length == total){
      return
    }
    setLoading(true)
    const resp = await api.get('incidents',{params:{page}});
    setIncidents([...incidents, ...resp.data])
    setTotal(resp.headers['x-total-count'])
    setPage(page+1)
    setLoading(false)
  }
  useEffect(() =>{
    loadIncidents()
  }, [])

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de
           <Text style={styles.headerTextBold}>
              {` ${total} casos`}
          </Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo</Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={(incident) => incident.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.5}
        renderItem={({item:incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty} >ONG:</Text>
            <Text style={styles.incidentValue} >{incident.name}</Text>

            <Text style={styles.incidentProperty} >CASO:</Text>
            <Text style={styles.incidentValue} >{incident.title}</Text>

            <Text style={styles.incidentProperty} >VALOR:</Text>
            <Text style={styles.incidentValue} >{ Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetails(incident)}>
              <Text style={styles.detailsButtonText}>Ver mais detalher</Text>
              <Feather name={'arrow-right'} size={16} color={'#E02041'} />
            </TouchableOpacity>
            
          </View>

        )}
      />

    </View>
  );
}
