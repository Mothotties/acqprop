import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Json } from "@/integrations/supabase/types";
import { ProfileBasicInfo } from "./ProfileBasicInfo";
import { NotificationPreferences } from "./NotificationPreferences";
import { InvestmentPreferences } from "./InvestmentPreferences";

interface Profile {
  full_name: string;
  phone: string;
  bio: string;
  avatar_url: string;
  investment_preferences: {
    propertyTypes: string[];
    priceRange: {
      min: number;
      max: number;
    };
    locations: string[];
  };
  notification_settings: {
    email: boolean;
    push: boolean;
  };
}

const defaultInvestmentPreferences = {
  propertyTypes: [],
  priceRange: { min: 0, max: 1000000 },
  locations: []
};

const defaultNotificationSettings = {
  email: true,
  push: true
};

export function ProfileManagement() {
  const session = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    phone: "",
    bio: "",
    avatar_url: "",
    investment_preferences: defaultInvestmentPreferences,
    notification_settings: defaultNotificationSettings
  });

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      if (!session?.user.id) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      
      if (data) {
        const investmentPrefs = data.investment_preferences as Json ?? defaultInvestmentPreferences;
        const notificationSettings = data.notification_settings as Json ?? defaultNotificationSettings;
        
        setProfile({
          ...profile,
          ...data,
          investment_preferences: typeof investmentPrefs === 'object' ? investmentPrefs : defaultInvestmentPreferences,
          notification_settings: typeof notificationSettings === 'object' ? notificationSettings : defaultNotificationSettings,
        });
      }
    } catch (error) {
      toast({
        title: "Error fetching profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!session?.user.id) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          investment_preferences: {
            propertyTypes: profile.investment_preferences.propertyTypes,
            priceRange: profile.investment_preferences.priceRange,
            locations: profile.investment_preferences.locations
          } as unknown as Json,
          notification_settings: {
            email: profile.notification_settings.email,
            push: profile.notification_settings.push
          } as unknown as Json,
          updated_at: new Date().toISOString()
        })
        .eq("id", session.user.id);

      if (error) throw error;

      setProfile((prev) => ({ ...prev, ...updates }));
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${session?.user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: publicUrl });
      
      toast({
        title: "Avatar uploaded",
        description: "Your profile picture has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error uploading avatar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <Tabs defaultValue="general" className="w-full max-w-4xl mx-auto">
      <TabsList className="mb-6">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="preferences">Investment Preferences</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <ProfileBasicInfo
          fullName={profile.full_name}
          phone={profile.phone}
          bio={profile.bio}
          avatarUrl={profile.avatar_url}
          onUpdate={(data) => updateProfile(data)}
          onAvatarUpload={uploadAvatar}
          isUploading={uploading}
        />
      </TabsContent>

      <TabsContent value="preferences">
        <InvestmentPreferences
          preferences={profile.investment_preferences}
          onUpdate={(preferences) => updateProfile({ investment_preferences: preferences })}
        />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationPreferences
          settings={profile.notification_settings}
          onUpdate={(settings) => updateProfile({ notification_settings: settings })}
        />
      </TabsContent>
    </Tabs>
  );
}