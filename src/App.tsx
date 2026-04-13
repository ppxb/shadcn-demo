import { Button } from '@/components/ui/button'
import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterXFill
} from '@remixicon/react'
import { ArrowUpRight, CloudDownload, ExternalLink, Search, Settings, Star } from 'lucide-react'

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 p-12">
      <div className="text-4xl font-bold">BUTTONS</div>
      <div className="grid grid-cols-6 gap-4">
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Default button</div>
          <Button>Default</Button>
        </div>

        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Secondary button</div>
          <Button variant="secondary">Secondary</Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Outline button</div>
          <Button variant="outline">Outline</Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Ghost button</div>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Destructive button</div>
          <Button variant="destructive">Destructive </Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Link button</div>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Disabled button</div>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Extra small button</div>
          <Button size="xs">Button</Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Small button</div>
          <Button size="sm">Button</Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Large button</div>
          <Button size="lg">Button</Button>
        </div>

        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Button with an icon on the left</div>
          <Button>
            <CloudDownload className="size-4" />
            Download
          </Button>
        </div>

        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Icon button</div>
          <Button size="icon">
            <Search className="size-4" />
          </Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">
            Secondary button with an icon on the right
          </div>
          <Button variant="secondary">
            Open Project
            <ExternalLink className="size-4" />
          </Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Ghost button with an icon on the left</div>
          <Button variant="ghost">
            <Settings className="size-4" />
            Settings
          </Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Link button with an icon on the right</div>
          <Button variant="link" className="group/link-button">
            Settings
            <ArrowUpRight className="size-4 transition-transform group-hover/link-button:rotate-45" />
          </Button>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Social login buttons with Remix Icons</div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="icon">
              <RiGoogleFill aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon">
              <RiFacebookFill aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon">
              <RiTwitterXFill aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon">
              <RiGithubFill aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon">
              <RiLinkedinFill aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon">
              <RiInstagramFill aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Outline star button with count</div>
          <Button variant="outline" className="pe-0">
            <Star className="size-4" />
            <span className="relative ms-1 px-3 text-xs font-medium opacity-80 before:absolute before:inset-0 before:left-0 before:w-px before:bg-[currentColor]/60">
              456
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
