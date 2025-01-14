import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
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

const MAX_RETRIES = 3;
const BASE_DELAY = 1000; // 1 second

export function ProfileManagement() {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    phone: "",
    bio: "",
    avatar_url: "",
    investment_preferences: defaultInvestmentPreferences,
    notification_settings: defaultNotificationSettings
  });

  useEffect(() => {
    let mounted = true;
    let retryTimeout: NodeJS.Timeout;

    const getProfile = async (attempt = 0) => {
      try {
        if (!session?.user?.id) {
          toast.error("No user session found");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          if (error.code === '429' && attempt < MAX_RETRIES) {
            const delay = BASE_DELAY * Math.pow(2, attempt);
            console.log(`Rate limited, retrying in ${delay}ms`);
            if (mounted) {
              setRetryCount(attempt + 1);
              retryTimeout = setTimeout(() => getProfile(attempt + 1), delay);
            }
            return;
          }
          throw error;
        }

        if (mounted && data) {
          const investmentPrefs = data.investment_preferences as Json;
          const notificationSettings = data.notification_settings as Json;

          setProfile({
            ...profile,
            ...data,
            investment_preferences: investmentPrefs ? 
              (typeof investmentPrefs === 'object' ? 
                {
                  propertyTypes: Array.isArray((investmentPrefs as any).propertyTypes) ? (investmentPrefs as any).propertyTypes : [],
                  priceRange: {
                    min: Number((investmentPrefs as any).priceRange?.min) || 0,
                    max: Number((investmentPrefs as any).priceRange?.max) || 1000000
                  },
                  locations: Array.isArray((investmentPrefs as any).locations) ? (investmentPrefs as any).locations : []
                }
              : defaultInvestmentPreferences)
              : defaultInvestmentPreferences,
            notification_settings: notificationSettings ? 
              (typeof notificationSettings === 'object' ? 
                {
                  email: Boolean((notificationSettings as any).email),
                  push: Boolean((notificationSettings as any).push)
                }
              : defaultNotificationSettings)
              : defaultNotificationSettings,
          });
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Error fetching profile. Please try again later.");
      } finally {
        if (mounted) {
          setLoading(false);
          setRetryCount(0);
        }
      }
    };

    getProfile();

    return () => {
      mounted = false;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [session]);

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!session?.user?.id) {
        toast.error("No user session found");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          investment_preferences: updates.investment_preferences as unknown as Json,
          notification_settings: updates.notification_settings as unknown as Json,
          updated_at: new Date().toISOString()
        })
        .eq("id", session.user.id);

      if (error) {
        if (error.code === '429') {
          toast.error("Too many requests. Please try again in a moment.");
        } else {
          toast.error("Error updating profile");
        }
        throw error;
      }

      setProfile((prev) => ({ ...prev, ...updates }));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Error updating profile. Please try again later.");
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Please select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${session?.user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        if (uploadError.message.includes('429')) {
          throw new Error("Too many upload requests. Please try again in a moment.");
        }
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: publicUrl });
      
      toast.success("Avatar uploaded successfully");
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast.error(error instanceof Error ? error.message : "Error uploading avatar");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
        {retryCount > 0 && (
          <p className="ml-2 text-sm text-muted-foreground">
            Retrying... ({retryCount}/{MAX_RETRIES})
          </p>
        )}
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