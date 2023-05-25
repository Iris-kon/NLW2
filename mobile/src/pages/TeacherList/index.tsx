import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import {
  BorderlessButton,
  RectButton,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'

import styles from './styles'

function TeacherList() {
  const [teachers, setTeachers] = useState([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [isFilterVisible, setIsFilterVisible] = useState(true)

  const [subject, setSubject] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id
          }
        )

        setFavorites(favoritedTeachersIds)
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites()
  })

  function handleToggleFiltersVisible() {
    setIsFilterVisible(!isFilterVisible)
  }

  async function hanfleFilterSubmit() {
    setIsFilterVisible(false)

    loadFavorites()

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      },
    })

    setTeachers(response.data)
  }

  const classesOptions = [
    { value: 'Artes', label: 'Artes' },
    { value: 'Biologia', label: 'Biologia' },
    { value: 'Ciências', label: 'Ciências' },
    { value: 'Química', label: 'Química' },
    { value: 'Física', label: 'Física' },
    { value: 'Educação física', label: 'Educação física' },
    { value: 'Geografia', label: 'Geografica' },
    { value: 'Português', label: 'Português' },
    { value: 'Inglês', label: 'Inglês' },
  ]

  const weekDaysOptions = [
    { value: '0', label: 'Domingo' },
    { value: '1', label: 'Segunda feira' },
    { value: '2', label: 'Terça feirra' },
    { value: '3', label: 'Quarta feira' },
    { value: '4', label: 'Quinta feira' },
    { value: '5', label: 'Sexta Feira' },
    { value: '6', label: 'Sábado' },
  ]

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys Disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFilterVisible ? (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <View
              style={{
                height: 54,
                backgroundColor: '#fff',
                borderRadius: 8,
                marginTop: 4,
                marginBottom: 16,
                overflow: 'hidden',
              }}
            >
              <Picker
                selectedValue={subject}
                onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}
              >
                <Picker.Item
                  label="Selecione a matéria"
                  value=""
                  enabled={false}
                />
                {classesOptions.map((c) => (
                  <Picker.Item key={c.value} label={c.label} value={c.value} />
                ))}
              </Picker>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <View
                  style={{
                    height: 54,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    marginTop: 4,
                    marginBottom: 16,
                    overflow: 'hidden',
                  }}
                >
                  <Picker
                    itemStyle={{ borderRadius: 15 }}
                    selectedValue={weekDay}
                    onValueChange={(itemValue, itemIndex) =>
                      setWeekDay(itemValue)
                    }
                  >
                    <Picker.Item
                      label="Selecione o dia"
                      value=""
                      enabled={false}
                    />
                    {weekDaysOptions.map((w) => (
                      <Picker.Item
                        key={w.value}
                        label={w.label}
                        value={w.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton
              onPress={hanfleFilterSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        ) : (
          <></>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default TeacherList
