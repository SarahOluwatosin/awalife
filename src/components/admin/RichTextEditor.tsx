import { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { NodeSelection } from '@tiptap/pm/state';
import {
  Bold, Italic, UnderlineIcon, Heading2, Heading3,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link2, Undo2, Redo2, Unlink, ImageIcon, Minimize2, Maximize2,
} from 'lucide-react';

const AlignableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-align': {
        default: null,
        parseHTML: el => el.getAttribute('data-align'),
        renderHTML: attrs => attrs['data-align'] ? { 'data-align': attrs['data-align'] } : {},
      },
      'data-width': {
        default: null,
        parseHTML: el => el.getAttribute('data-width'),
        renderHTML: attrs => attrs['data-width'] ? { 'data-width': attrs['data-width'] } : {},
      },
    };
  },
});
import { cn } from '@/lib/utils';
import { uploadToStorage } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
};

const ToolbarButton = ({
  onClick, active, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    onMouseDown={e => { e.preventDefault(); onClick(); }}
    className={cn(
      'h-8 w-8 flex items-center justify-center rounded text-sm transition-colors',
      active
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
    )}
  >
    {children}
  </button>
);

const RichTextEditor = ({ value, onChange, placeholder = 'Write article content...', className }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
      AlignableImage.configure({ inline: false, allowBase64: false }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      handleClick(view, _pos, event) {
        const target = event.target;
        if (!(target instanceof HTMLImageElement)) return false;
        const imagePos = view.posAtDOM(target, 0);
        view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, imagePos)));
        return true;
      },
    },
  });

  if (!editor) return null;

  const handleSetLink = () => {
    const prev = editor.getAttributes('link').href ?? '';
    const url = window.prompt('Enter URL', prev);
    if (url === null) return;
    if (!url) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Please select an image file', variant: 'destructive' });
      return;
    }
    try {
      const url = await uploadToStorage('media', 'news-content', file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch {
      toast({ title: 'Failed to upload image', variant: 'destructive' });
    }
  };

  return (
    <div className={cn('rounded-lg border border-input bg-background flex flex-col', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 p-2 border-b border-border/60 bg-muted/30 rounded-t-lg">
        <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
        <div className="w-px mx-1 bg-border/60 self-stretch" />
        <ToolbarButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <div className="w-px mx-1 bg-border/60 self-stretch" />
        <ToolbarButton title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-3.5 w-3.5" />
        </ToolbarButton>
        <div className="w-px mx-1 bg-border/60 self-stretch" />
        <ToolbarButton title="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
          <AlignLeft className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
          <AlignCenter className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Align right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
          <AlignRight className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Justify" active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
          <AlignJustify className="h-3.5 w-3.5" />
        </ToolbarButton>
        <div className="w-px mx-1 bg-border/60 self-stretch" />
        <ToolbarButton title="Insert link" active={editor.isActive('link')} onClick={handleSetLink}>
          <Link2 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Remove link" active={false} onClick={() => editor.chain().focus().unsetLink().run()}>
          <Unlink className="h-3.5 w-3.5" />
        </ToolbarButton>
        <div className="w-px mx-1 bg-border/60 self-stretch" />
        <ToolbarButton title="Insert image" active={false} onClick={() => fileInputRef.current?.click()}>
          <ImageIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Image: align left (click image first)" active={editor.getAttributes('image')['data-align'] === 'left'} onClick={() => editor.chain().focus().updateAttributes('image', { 'data-align': 'left' }).run()}>
          <AlignLeft className="h-3.5 w-3.5 text-primary/70" />
        </ToolbarButton>
        <ToolbarButton title="Image: center (click image first)" active={editor.getAttributes('image')['data-align'] === 'center'} onClick={() => editor.chain().focus().updateAttributes('image', { 'data-align': 'center' }).run()}>
          <AlignCenter className="h-3.5 w-3.5 text-primary/70" />
        </ToolbarButton>
        <ToolbarButton title="Image: align right (click image first)" active={editor.getAttributes('image')['data-align'] === 'right'} onClick={() => editor.chain().focus().updateAttributes('image', { 'data-align': 'right' }).run()}>
          <AlignRight className="h-3.5 w-3.5 text-primary/70" />
        </ToolbarButton>
        <ToolbarButton title="Image: half width (click image first)" active={editor.getAttributes('image')['data-width'] === '50%'} onClick={() => editor.chain().focus().updateAttributes('image', { 'data-width': editor.getAttributes('image')['data-width'] === '50%' ? null : '50%' }).run()}>
          <Minimize2 className="h-3.5 w-3.5 text-primary/70" />
        </ToolbarButton>
        <div className="w-px mx-1 bg-border/60 self-stretch" />
        <ToolbarButton title="Undo" active={false} onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Redo" active={false} onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 className="h-3.5 w-3.5" />
        </ToolbarButton>
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
          e.target.value = '';
        }}
      />

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className={[
          'prose prose-sm max-w-none flex-1 p-3 focus-within:outline-none min-h-[240px]',
          '[&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[220px]',
          // placeholder
          '[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground',
          '[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
          '[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left',
          '[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none',
          '[&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0',
          // headings
          '[&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mt-5 [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h2]:text-foreground',
          '[&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h3]:mb-1.5 [&_.ProseMirror_h3]:text-foreground',
          // lists
          '[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul]:my-2',
          '[&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol]:my-2',
          '[&_.ProseMirror_li]:my-0.5',
          // links — underline + primary color
          '[&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:cursor-pointer',
          // images
          '[&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:my-4',
        ].join(' ')}
      />
    </div>
  );
};

export default RichTextEditor;
