import { StyleSheet, View } from 'react-native';

export function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f7eae0',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
  },
});