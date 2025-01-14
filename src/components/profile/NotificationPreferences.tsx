import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationPreferencesProps {
  settings: {
    email: boolean;
    push: boolean;
  };
  onUpdate: (settings: { email: boolean; push: boolean }) => void;
}

export function NotificationPreferences({ settings, onUpdate }: NotificationPreferencesProps) {
  return (
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
            checked={settings.email}
            onCheckedChange={(checked) =>
              onUpdate({ ...settings, email: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Push Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive push notifications</p>
          </div>
          <Switch
            checked={settings.push}
            onCheckedChange={(checked) =>
              onUpdate({ ...settings, push: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}