import { searchStyles } from '@/assets/styles/search.styles';
import LoadingSpinner from '@/components/LoadingSpinner';
import RecipeCard from '@/components/RecipeCard';
import { colors } from '@/constants/colors';
import { useDebounce } from '@/hooks/useDebounce';
import { MealAPI } from '@/services/mealAPI';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const performSearch = async (query) => {

    // No Search Query
    if (!searchQuery.trim()) {
      const randomMeals = await MealAPI.getRandomMeals(12);
      return randomMeals.map((meal) => MealAPI.transformMealData(meal)).filter(meal => meal !== null)
    }

    // Search by name first then by ingredients if no results

    const nameResults = await MealAPI.searchMealsByName(query);
    let results = nameResults;

    if (results.lenght === 0) {
      const ingredientResults = await MealAPI.filterByIngredient(query);
      results = ingredientResults;
    }

    return results.slice(0, 12).map(meal => MealAPI.transformMealData(meal)).filter(meal => meal !== null);
  }


  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const results = await performSearch();
        setRecipes(results);
      } catch (error) {
        console.error("Error loading initial data: ", error)
      } finally {
        setInitialLoading(false);
      }
    }

    loadInitialData();
  }, [])


  useEffect(() => {
    if (initialLoading) return;


    const handleSearch = async () => {
      setLoading(true)
      try {
        const results = await performSearch(debouncedSearchQuery)
        setRecipes(results);
      } catch (error) {
        console.error("Error searching: ", error)
        setRecipes([])
      } finally {
        setLoading(false)
      }
    }

    handleSearch();
  }, [debouncedSearchQuery, initialLoading])


  if (initialLoading) return (<LoadingSpinner message='Loading recipes...' />);

  return (
    <View style={searchStyles.container}>
      <View style={searchStyles.searchSection}>
        <View style={searchStyles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={colors.textLight}
            style={searchStyles.searchIcon}
          />

          <TextInput
            style={searchStyles.searchInput}
            placeholder='Search recipes, ingredients...'
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={searchStyles.clearButton}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={colors.textLight}
              />
            </TouchableOpacity>
          )}
        </View>

      </View>
      <View style={searchStyles.resultsSection}>
        <View style={searchStyles.resultsHeader}>
          <Text style={searchStyles.resultsTitle}>
            {searchQuery ? `Results for "${searchQuery}"` : "Popular Recipes"}
          </Text>
          <Text style={searchStyles.resultsCount}>
            {recipes.length} found
          </Text>
        </View>
        {loading ? (
          <View style={searchStyles.loadingContainer}>
            <LoadingSpinner message='Searching recipes...' size='small' />
          </View>
        ) : (
          <FlatList
            data={recipes}
            key={(item) => item.id.toString()}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            numColumns={2}
            columnWrapperStyle={searchStyles.row}
            contentContainerStyle={searchStyles.recipesGrid}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <NoResultsFound />}
          />
        )}
      </View>
    </View>
  )
}

function NoResultsFound() {
  return (
    <View style={searchStyles.emptyState}>
      <Ionicons name="search-outline" size={64} color={colors.textLight} />
      <Text style={searchStyles.emptyTitle}>No recipes found</Text>
      <Text style={searchStyles.emptyDescription}>
        Try adjusting your search or try different keywords
      </Text>
    </View>
  );
}