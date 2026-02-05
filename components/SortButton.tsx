import { useThemeColor } from "@/hooks/useThemeColors";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, View } from "react-native";
import Card from "./Card";
import Radio from "./Radio";
import Row from "./Row";
import ThedText from "./ThedText";

type SortButtonProps = {
  value: string;
  onChange: (v: "name" | "id") => void;
};

export default function SortButton({ value, onChange }: SortButtonProps) {
  const colors = useThemeColor();
  const [modalVisible, setModalVisible] = useState(false);
  const onButtonPress = () => {
    setModalVisible(true);
  };
  const onClose = () => {
    setModalVisible(!modalVisible);
  };
  const options = [
    { label: "Number", value: "id" },
    { label: "Name", value: "name" },
  ] as const;

  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View style={[styles.button, { backgroundColor: colors.white }]}>
          <Image
            source={
              value === "id"
                ? require("@/assets/images/numerique.png")
                : require("@/assets/images/alpha.png")
            }
            style={{ width: 16, height: 16 }}
          />
        </View>
      </Pressable>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.popup, { backgroundColor: colors.tint }]}>
          <ThedText
            variant="subTitle2"
            color="grayscaleLight"
            style={styles.title}
          >
            Sort by:
          </ThedText>
          <Card style={styles.card}>
            {options.map((o) => (
              <Pressable key={o.value} onPress={() => onChange(o.value)}>
                <Row gap={5}>
                  <Radio checked={value === o.value} />
                  <View>
                    <ThedText color="medium">{o.label}</ThedText>
                  </View>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 32,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  popup: {
    padding: 4,
    paddingTop: 16,
    gap: 16,
    borderRadius: 12,
  },
  title: {
    paddingLeft: 20,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
});
