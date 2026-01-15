import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useUser } from "@clerk/expo";
import { useQuery } from "convex/react";
import { api } from "@substratia/convex";

export default function DashboardScreen() {
  const { user, isLoaded: userLoaded } = useUser();
  const stats = useQuery(api.users.getStats);
  const recentSnapshots = useQuery(api.snapshots.getRecent, { limit: 3 });
  const recentMemories = useQuery(api.memories.getRecent, { limit: 3 });

  if (!userLoaded) {
    return (
      <View className="flex-1 bg-forge-dark items-center justify-center">
        <ActivityIndicator size="large" color="#00d4ff" />
      </View>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <ScrollView className="flex-1 bg-forge-dark p-4">
        <View className="items-center py-12">
          <Text className="text-white text-2xl font-bold mb-4">
            Welcome to Substratia
          </Text>
          <Text className="text-gray-400 text-center mb-6">
            Memory infrastructure for AI. Sign in to sync your snapshots and
            memories across devices.
          </Text>
          <View className="bg-forge-cyan/20 px-6 py-3 rounded-lg">
            <Text className="text-forge-cyan font-medium">
              Configure EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to enable sign in
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-forge-dark p-4">
      {/* Welcome Header */}
      <Text className="text-white text-2xl font-bold">
        Welcome back, {user.firstName || "Developer"}
      </Text>
      <Text className="text-gray-400 mt-1">Substratia Cloud Dashboard</Text>

      {/* Stats Grid */}
      <View className="flex-row gap-3 mt-6">
        <View className="flex-1 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <Text className="text-gray-400 text-sm">Snapshots</Text>
          <Text className="text-white text-3xl font-bold mt-2">
            {stats?.snapshotCount ?? "—"}
          </Text>
        </View>

        <View className="flex-1 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <Text className="text-gray-400 text-sm">Memories</Text>
          <Text className="text-white text-3xl font-bold mt-2">
            {stats?.memoryCount ?? "—"}
          </Text>
        </View>
      </View>

      {/* Tier */}
      <View className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mt-3">
        <Text className="text-gray-400 text-sm">Plan</Text>
        <Text className="text-forge-cyan text-2xl font-bold mt-2 capitalize">
          {stats?.tier ?? "Free"}
        </Text>
      </View>

      {/* Recent Snapshots */}
      <View className="mt-6">
        <Text className="text-white text-lg font-bold mb-3">Recent Snapshots</Text>
        {recentSnapshots === undefined ? (
          <ActivityIndicator color="#00d4ff" />
        ) : recentSnapshots.length === 0 ? (
          <View className="bg-gray-800/30 rounded-xl p-4 items-center">
            <Text className="text-gray-400">No snapshots yet</Text>
            <Text className="text-gray-500 text-sm mt-1">
              Use /momentum:save in Claude Code
            </Text>
          </View>
        ) : (
          recentSnapshots.map((snapshot) => (
            <View
              key={snapshot._id}
              className="bg-gray-800/30 rounded-xl p-4 mb-2 border border-gray-700"
            >
              <Text className="text-white font-medium">{snapshot.summary}</Text>
              <Text className="text-gray-400 text-sm mt-1" numberOfLines={1}>
                {snapshot.projectPath}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* Recent Memories */}
      <View className="mt-6 mb-8">
        <Text className="text-white text-lg font-bold mb-3">Recent Memories</Text>
        {recentMemories === undefined ? (
          <ActivityIndicator color="#00d4ff" />
        ) : recentMemories.length === 0 ? (
          <View className="bg-gray-800/30 rounded-xl p-4 items-center">
            <Text className="text-gray-400">No memories yet</Text>
            <Text className="text-gray-500 text-sm mt-1">
              Use store from memory-mcp
            </Text>
          </View>
        ) : (
          recentMemories.map((memory) => (
            <View
              key={memory._id}
              className="bg-gray-800/30 rounded-xl p-4 mb-2 border border-gray-700"
            >
              <Text className="text-white" numberOfLines={2}>
                {memory.content}
              </Text>
              <Text className="text-gray-500 text-xs mt-2">
                Accessed {memory.accessCount}×
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
