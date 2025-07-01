import { favoritesStyles } from "@/assets/styles/favorites.styles";
import AlertModal from "@/components/AlertModal";
import LoadingSpinner from '@/components/LoadingSpinner';
import NoFavoritesFound from "@/components/NoFavoritesFound";
import RecipeCard from "@/components/RecipeCard";
import { API_URL } from "@/constants/api";
import { colors } from "@/constants/colors";
import { useClerk, useUser } from '@clerk/clerk-expo';
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

export default function Favorites() {
  const { signOut } = useClerk()
  const { user } = useUser()
  const [favoriteRecipe, setFavoriteRecipe] = useState([])
  const [loading, setLoading] = useState(true);
  const [alertModalVisible, setAlertModalVisible] = useState(false)

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetch(`${API_URL}/favorites/${user.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch favorites")
        }

        const favorites = await response.json();

        // Transform the data to match recipe card component
        const transformedFavorites = favorites.map(favorite => ({
          ...favorite,
          id: favorite.recipeId,
        }))
        setFavoriteRecipe(transformedFavorites)
      } catch (error) {
        console.log("Error loading favorites: ", error)
        ToastAndroid.show("Failed to load favorites", ToastAndroid.SHORT)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [user.id])

  const handleSignOut = async () => {
    setAlertModalVisible(true)
  }

  if (loading) return (<LoadingSpinner message="Loading your favorites" />);

  return (
    <View style={favoritesStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={favoritesStyles.header}>
          <Text style={favoritesStyles.title}>
            Favorites
          </Text>
          <TouchableOpacity style={favoritesStyles.logoutButton} onPress={handleSignOut}>
            <Ionicons
              name="log-out-outline"
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        <View style={favoritesStyles.recipesSection}>
          <FlatList
            data={favoriteRecipe}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={favoritesStyles.row}
            contentContainerStyle={favoritesStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={<NoFavoritesFound />}
          />

        </View>


        <AlertModal
          visible={alertModalVisible}
          title={"Logout"}
          subTitle={"Are you sure you want to logout?"}
          onCancel={() => setAlertModalVisible(false)}
          onSubmit={signOut}
        />
      </ScrollView>
    </View>
  )
}