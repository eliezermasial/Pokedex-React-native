import { useThemeColor } from "@/hooks/useThemeColors";
import { Image, StyleSheet, TextInput } from "react-native";
import Row from "./Row";

type props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: props) {
  const colors = useThemeColor();
  return (
    <Row gap={12} style={[styles.wrapper, { backgroundColor: colors.white }]}>
      <Image
        source={require("@/assets/images/search.png")}
        style={{ width: 25, height: 25 }}
      />
      <TextInput
        value={value}
        style={styles.input}
        onChangeText={onChange}
        placeholder="Rechercher un Pokémon"
        placeholderTextColor="#999"
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    lineHeight: 16,
    fontSize: 14,
    paddingVertical: 0,
    height: "100%",
  },
});
