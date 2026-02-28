import formatStatName from "@/functions/formatStatName";
import { StyleSheet, View } from "react-native";
import Row from "./Row";
import ThedText from "./ThedText";

type Props = {
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  color: string;
};

export default function PokemonStats({ stats, color }: Props) {
  return (
    <View style={styles.container}>
      {stats.map((item) => {
        const percentage = (item.base_stat / 200) * 100;
        return (
          <Row key={item.stat.name} gap={8}>
            <ThedText style={styles.label} color="medium">
              {formatStatName(item.stat.name)}
            </ThedText>
            <ThedText style={styles.value} color="medium">
              {item.base_stat}
            </ThedText>
            <View style={styles.barBackground}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${percentage}%`,
                    backgroundColor: color,
                  },
                ]}
              />
            </View>
          </Row>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
    paddingVertical: 10,
  },
  label: {
    width: 40,
    fontWeight: "bold",
  },
  value: {
    width: 30,
  },
  barBackground: {
    flex: 1,
    height: 6,
    backgroundColor: "#EEE",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
});
