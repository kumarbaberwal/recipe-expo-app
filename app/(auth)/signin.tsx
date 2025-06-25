import { authStyles } from '@/assets/auth.styles'
import { colors } from '@/constants/colors'
import { useSignIn } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'

export default function Signin() {
  const router = useRouter()
  const { signIn, setActive, isLoaded } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT)
      return
    }

    if (!isLoaded) return;

    setLoading(true)

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
      } else {
        ToastAndroid.show("Sign in failed.", ToastAndroid.SHORT)
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'errors' in error && Array.isArray((error as any).errors)) {
        ToastAndroid.show((error as any).errors?.[0]?.message || "Sign in failed", ToastAndroid.SHORT)
      } else {
        ToastAndroid.show("Sign in failed", ToastAndroid.SHORT)
      }
      console.error(JSON.stringify(error, null, 2))
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView style={authStyles.keyboardView} behavior={Platform.OS === 'ios' ? "padding" : undefined}>
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={authStyles.imageContainer}
          >
            <Image
              source={require("@/assets/images/i1.png")}
              style={authStyles.image}
              contentFit='contain'
            />
          </View>

          {/* Welcome text */}
          <Text style={authStyles.title}>
            Welcome Back
          </Text>

          {/* Form Container */}
          <View style={authStyles.formContainer}>

            {/* Email Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder='Enter email'
                placeholderTextColor={colors.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter password"
                placeholderTextColor={colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={colors.textLight}
                />
              </TouchableOpacity>
            </View>

            {/* Signin button */}
            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>
                {loading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            {/* Sign up Link */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.push("/signup")}
            >
              <Text style={authStyles.linkText}
              >
                Don&apos;t have an account? <Text style={authStyles.link}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}