import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@substratia/convex";

type SnapshotImportance = "critical" | "important" | "normal" | "reference";

interface Snapshot {
  _id: string;
  summary: string;
  projectPath: string;
  importance: SnapshotImportance;
  createdAt: number;
}

function getImportanceStyle(importance: SnapshotImportance) {
  switch (importance) {
    case "critical":
      return { bg: "bg-red-500/20", text: "text-red-400" };
    case "important":
      return { bg: "bg-yellow-500/20", text: "text-yellow-400" };
    default:
      return { bg: "bg-gray-600/50", text: "text-gray-400" };
  }
}

export default function SnapshotsScreen() {
  const snapshots = useQuery(api.snapshots.getRecent, { limit: 50 }) as Snapshot[] | undefined;

  if (snapshots === undefined) {
    return (
      <View className="flex-1 bg-forge-dark items-center justify-center">
        <ActivityIndicator size="large" color="#00d4ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-forge-dark">
      <FlatList
        data={snapshots}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => {
          const style = getImportanceStyle(item.importance);
          return (
            <View className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 mr-3">
                  <Text className="text-white font-medium">{item.summary}</Text>
                  <Text
                    className="text-gray-400 text-sm mt-1"
                    numberOfLines={1}
                  >
                    {item.projectPath}
                  </Text>
                </View>
                <View className={`px-2 py-1 rounded ${style.bg}`}>
                  <Text className={`text-xs ${style.text}`}>
                    {item.importance}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-500 text-xs mt-3">
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-gray-400 text-lg">No snapshots yet</Text>
            <Text className="text-gray-500 text-sm mt-2 text-center">
              Use /momentum:save in Claude Code to create snapshots
            </Text>
          </View>
        }
      />
    </View>
  );
}
