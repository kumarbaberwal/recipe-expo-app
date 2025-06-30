import { authStyles } from '@/assets/styles/auth.styles'
import { colors } from '@/constants/colors'
import { useSignUp } from '@clerk/clerk-expo'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'

export default function VerifyEmail({ email, onBack }: { email: string, onBack: () => void }) {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerification = async () => {
    if (!isLoaded) return;

    setLoading(true)
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code })

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId })
      }
      else {
        ToastAndroid.show("Verification failed. Please try again.", ToastAndroid.SHORT)
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (error) {
      ToastAndroid.show(error instanceof Error ? error.message : "Verification failed", ToastAndroid.SHORT)
      console.error(JSON.stringify(error, null, 2))
    } finally {
      setLoading(true)
    }
  }

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardView}
      >
        {/* Scroll View */}
        <ScrollView
          style={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Container */}
          <View style={authStyles.imageContainer}>
            <Image
              source={require("@/assets/images/i3.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          {/* Title */}
          <Text style={authStyles.title}>
            Verify Your Email
          </Text>

          {/* SubTitle */}
          <Text style={authStyles.subtitle}>
            We&apos;ve sent a verification code to {email}
          </Text>

          {/* form container */}
          <View style={authStyles.formContainer}>
            {/* Verification code input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter verification code"
                placeholderTextColor={colors.textLight}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
            onPress={handleVerification}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={authStyles.buttonText}>
              {loading ? "Verifying..." : "Verify Email"}
            </Text>
          </TouchableOpacity>

          {/* Back to Sign up */}
          <TouchableOpacity style={authStyles.linkContainer} onPress={onBack}>
            <Text style={authStyles.linkText}>
              <Text style={authStyles.link}>Back to Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}