import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfileManagement = () => {
  const session = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    bio: "",
    avatar_url: "",
    investment_preferences: {
      propertyTypes: [],
      priceRange: { min: 0, max: 1000000 },
      locations: []
    },
    notification_settings: {
      email: true,
      push: true
    }
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
        setProfile({
          ...profile,
          ...data,
          investment_preferences: data.investment_preferences || profile.investment_preferences,
          notification_settings: data.notification_settings || profile.notification_settings
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

  const updateProfile = async () => {
    try {
      if (!session?.user.id) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
          investment_preferences: profile.investment_preferences,
          notification_settings: profile.notification_settings,
          updated_at: new Date().toISOString()
        })
        .eq("id", session.user.id);

      if (error) throw error;

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

      setProfile({ ...profile, avatar_url: publicUrl });
      
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
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information and profile picture.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback>{profile.full_name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
                    <Camera className="h-4 w-4" />
                    <span>Change picture</span>
                  </div>
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={uploadAvatar}
                  disabled={uploading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="preferences">
        <Card>
          <CardHeader>
            <CardTitle>Investment Preferences</CardTitle>
            <CardDescription>Customize your investment preferences to get personalized recommendations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Property Types</Label>
              {/* Add property type selection UI here */}
            </div>

            <div className="space-y-2">
              <Label>Price Range</Label>
              {/* Add price range slider here */}
            </div>

            <div className="space-y-2">
              <Label>Preferred Locations</Label>
              {/* Add location selection UI here */}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive updates and alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch
                checked={profile.notification_settings.email}
                onCheckedChange={(checked) =>
                  setProfile({
                    ...profile,
                    notification_settings: { ...profile.notification_settings, email: checked }
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications</p>
              </div>
              <Switch
                checked={profile.notification_settings.push}
                onCheckedChange={(checked) =>
                  setProfile({
                    ...profile,
                    notification_settings: { ...profile.notification_settings, push: checked }
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <div className="mt-6">
        <Button onClick={updateProfile} className="w-full">
          Save Changes
        </Button>
      </div>
    </Tabs>
  );
};