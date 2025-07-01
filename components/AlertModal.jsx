import { colors } from '@/constants/colors';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function AlertModal({ visible, title, subTitle, onCancel, onSubmit }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
              <Text style={styles.submitText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.background,
    width: '90%', // equivalent to Tailwind's w-11/12
    // marginVertical: 24,
    // minWidth: 400,
    maxWidth: 400, // max-w-md ~ 400px
    borderRadius: 16, // rounded-2xl
    padding: 24, // p-6
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    color: colors.text,
    fontSize: 28, // text-xl
    fontWeight: '800', // font-semibold
    textAlign: 'center',
    marginBottom: 8, // mb-2
  },
  subTitle: {
    color: colors.textLight, // Tailwind's text-gray-500
    fontSize: 16, // text-base
    textAlign: 'center',
    marginBottom: 24, // mb-6
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12, // React Native doesn’t support gap natively; can use marginRight/Left if needed
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.white, // Tailwind's bg-gray-100
    paddingVertical: 12, // py-3
    borderRadius: 24, // rounded-3xl
    marginRight: 6, // half of gap (12)
  },
  cancelText: {
    textAlign: 'center',
    color: colors.text, // Tailwind's text-red-500
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.primary, // Tailwind's bg-blue-500
    paddingVertical: 12,
    borderRadius: 9999, // rounded-full
    marginLeft: 6, // other half of gap
  },
  submitText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
