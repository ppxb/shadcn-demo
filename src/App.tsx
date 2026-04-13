import { Button } from '@/components/ui/button'
import { CloudDownload, SearchIcon } from 'lucide-react'

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
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
            <SearchIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
