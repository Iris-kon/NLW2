import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { Image, Linking, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatssappIcon from '../../assets/images/icons/whatsapp.png'

import api from '../../services/api'
import styles from './styles'

export interface Teacher {
  id: string
  subject: string
  cost: number
  users: {
    name: string
    avatar: string
    bio: string
    whatsapp: string
  }
}

interface TeacherItemProps {
  teacher: Teacher
  favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited)

  function handleLinkToWhatsapp() {
    api.post('connections', {
      user_id: teacher.id,
    })

    Linking.openURL(`whatsapp://send?phone=${teacher.users.whatsapp}`)
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites')

    let favoritesArray = []

    if (favorites) {
      favoritesArray = JSON.parse(favorites)
    }

    if (isFavorited) {
      //remove from favorite
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id
      })

      favoritesArray.splice(favoriteIndex, 1)

      setIsFavorited(false)
    } else {
      //add to favorite
      favoritesArray.push(teacher)

      setIsFavorited(true)
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.users.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.users.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.users.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>{teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
          >
            {isFavorited ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatssappIcon} />

            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem
