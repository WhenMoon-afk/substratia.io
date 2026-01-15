import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@substratia/convex";

type MemoryImportance = "critical" | "high" | "normal" | "low";

interface Memory {
  _id: string;
  content: string;
  importance: MemoryImportance;
  accessCount: number;
  lastAccessed: number;
}

function getImportanceStyle(importance: MemoryImportance) {
  switch (importance) {
    case "critical":
      return { bg: "bg-red-500/20", text: "text-red-400" };
    case "high":
      return { bg: "bg-yellow-500/20", text: "text-yellow-400" };
    default:
      return { bg: "bg-gray-600/50", text: "text-gray-400" };
  }
}

export default function MemoriesScreen() {
  const memories = useQuery(api.memories.getRecent, { limit: 50 }) as Memory[] | undefined;

  if (memories === undefined) {
    return (
      <View className="flex-1 bg-forge-dark items-center justify-center">
        <ActivityIndicator size="large" color="#00d4ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-forge-dark">
      <FlatList
        data={memories}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => {
          const style = getImportanceStyle(item.importance);
          return (
            <View className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <Text className="text-white" numberOfLines={3}>
                {item.content}
              </Text>
              <View className="flex-row items-center mt-3 gap-2">
                <View className={`px-2 py-1 rounded ${style.bg}`}>
                  <Text className={`text-xs ${style.text}`}>
                    {item.importance}
                  </Text>
                </View>
                <Text className="text-gray-500 text-xs">
                  Accessed {item.accessCount}×
                </Text>
              </View>
              <Text className="text-gray-500 text-xs mt-2">
                Last accessed: {new Date(item.lastAccessed).toLocaleString()}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-gray-400 text-lg">No memories yet</Text>
            <Text className="text-gray-500 text-sm mt-2 text-center">
              Use the store command from memory-mcp to save memories
            </Text>
          </View>
        }
      />
    </View>
  );
}
