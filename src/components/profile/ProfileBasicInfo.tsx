import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ProfileBasicInfoProps {
  fullName: string;
  phone: string;
  bio: string;
  avatarUrl: string;
  onUpdate: (data: { full_name: string; phone: string; bio: string }) => void;
  onAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
}

export function ProfileBasicInfo({
  fullName,
  phone,
  bio,
  avatarUrl,
  onUpdate,
  onAvatarUpload,
  isUploading
}: ProfileBasicInfoProps) {
  const [editedFullName, setEditedFullName] = useState(fullName);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [editedBio, setEditedBio] = useState(bio);

  const handleSubmit = () => {
    onUpdate({
      full_name: editedFullName,
      phone: editedPhone,
      bio: editedBio
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information and profile picture.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{fullName?.charAt(0) || "U"}</AvatarFallback>
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
              onChange={onAvatarUpload}
              disabled={isUploading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            value={editedFullName}
            onChange={(e) => setEditedFullName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={editedPhone}
            onChange={(e) => setEditedPhone(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button onClick={handleSubmit}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}