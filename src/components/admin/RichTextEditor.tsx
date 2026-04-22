import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import type { ReactNodeViewProps } from '@tiptap/react';
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
import { cn } from '@/lib/utils';
import { uploadToStorage } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';

type ResizeSide = 'left' | 'right';

const ResizableImageNodeView = ({ node, updateAttributes, selected, editor }: ReactNodeViewProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const startResize = useCallback((side: ResizeSide) => (event: React.PointerEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const img = imgRef.current;
    if (!img) return;

    const startX = event.clientX;
    const startWidth = img.getBoundingClientRect().width || img.naturalWidth || 400;
    const containerWidth = editor.view.dom.getBoundingClientRect().width || startWidth;

    setIsResizing(true);

    const onMove = (e: PointerEvent) => {
      const delta = e.clientX - startX;
      const nextWidth = side === 'right' ? startWidth + delta : startWidth - delta;
      const clamped = Math.max(140, Math.min(containerWidth, nextWidth));
      updateAttributes({ width: String(Math.round(clamped)), 'data-width': null });
    };

    const onUp = () => {
      setIsResizing(false);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, [editor.view.dom, updateAttributes]);

  useEffect(() => {
    if (!isResizing) return;
    const prev = document.body.style.cursor;
    document.body.style.cursor = 'ew-resize';
    return () => { document.body.style.cursor = prev; };
  }, [isResizing]);

  const align = (node.attrs as Record<string, unknown>)['data-align'];
  const dataWidth = (node.attrs as Record<string, unknown>)['data-width'];
  const width = (node.attrs as Record<string, unknown>).width;
  const rawSrc = (node.attrs as Record<string, unknown>).src;
  const rawAlt = (node.attrs as Record<string, unknown>).alt;
  const rawTitle = (node.attrs as Record<string, unknown>).title;
  const src = typeof rawSrc === 'string' ? rawSrc : '';
  const alt = typeof rawAlt === 'string' ? rawAlt : '';
  const title = typeof rawTitle === 'string' ? rawTitle : '';

  const alignClass =
    align === 'center' ? 'mx-auto' :
    align === 'left' ? 'float-left mr-6 mb-2' :
    align === 'right' ? 'float-right ml-6 mb-2' :
    '';

  const showHandles = editor.isEditable && (selected || isResizing);

  return (
    <NodeViewWrapper
      className={cn('group relative my-4 max-w-full', alignClass)}
      data-align={typeof align === 'string' ? align : undefined}
      data-width={typeof dataWidth === 'string' ? dataWidth : undefined}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        title={title}
        width={typeof width === 'string' || typeof width === 'number' ? Number(width) : undefined}
        data-align={typeof align === 'string' ? align : undefined}
        data-width={typeof dataWidth === 'string' ? dataWidth : undefined}
        draggable={false}
        className={cn(
          'max-w-full rounded-lg',
          selected && 'ring-2 ring-primary/30',
          align === 'center' && 'mx-auto',
        )}
      />

      <div
        role="button"
        aria-label="Resize image"
        onPointerDown={startResize('left')}
        className={cn(
          'absolute inset-y-0 -left-2 w-3 cursor-ew-resize',
          'opacity-0 transition-opacity group-hover:opacity-100',
          showHandles && 'opacity-100',
        )}
      />
      <div
        role="button"
        aria-label="Resize image"
        onPointerDown={startResize('right')}
        className={cn(
          'absolute inset-y-0 -right-2 w-3 cursor-ew-resize',
          'opacity-0 transition-opacity group-hover:opacity-100',
          showHandles && 'opacity-100',
        )}
      />
    </NodeViewWrapper>
  );
};

const AlignableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: el => el.getAttribute('width'),
        renderHTML: attrs => attrs.width ? { width: attrs.width } : {},
      },
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
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageNodeView);
  },
});

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
      handleClickOn(view, _pos, node, nodePos) {
        if (node.type.name !== 'image') return false;
        view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos)));
        view.focus();
        return true;
      },
    },
  });

  if (!editor) return null;

  const applyToSelectedImage = useCallback((attrs: Record<string, unknown>) => {
    const didApply = editor.chain().focus().command(({ tr, state }) => {
      const { selection } = state;
      let imagePos: number | null = null;

      if (selection instanceof NodeSelection && selection.node.type.name === 'image') {
        imagePos = selection.from;
      } else {
        const { $from } = selection;
        if ($from.nodeAfter?.type.name === 'image') imagePos = $from.pos;
        else if ($from.nodeBefore?.type.name === 'image') imagePos = $from.pos - $from.nodeBefore.nodeSize;
      }

      if (imagePos === null) return false;
      const node = state.doc.nodeAt(imagePos);
      if (!node || node.type.name !== 'image') return false;

      tr.setNodeMarkup(imagePos, undefined, { ...node.attrs, ...attrs });
      return true;
    }).run();

    if (!didApply) {
      toast({ title: 'Click an image first', description: 'Select an image in the editor to align or resize it.' });
    }
  }, [editor]);

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
        <ToolbarButton
          title="Image: align left (click image first)"
          active={editor.getAttributes('image')['data-align'] === 'left'}
          onClick={() => applyToSelectedImage({ 'data-align': 'left' })}
        >
          <AlignLeft className="h-3.5 w-3.5 text-primary/70" />
        </ToolbarButton>
        <ToolbarButton
          title="Image: center (click image first)"
          active={editor.getAttributes('image')['data-align'] === 'center'}
          onClick={() => applyToSelectedImage({ 'data-align': 'center' })}
        >
          <AlignCenter className="h-3.5 w-3.5 text-primary/70" />
        </ToolbarButton>
        <ToolbarButton
          title="Image: align right (click image first)"
          active={editor.getAttributes('image')['data-align'] === 'right'}
          onClick={() => applyToSelectedImage({ 'data-align': 'right' })}
        >
          <AlignRight className="h-3.5 w-3.5 text-primary/70" />
        </ToolbarButton>
        <ToolbarButton
          title="Image: half width (click image first)"
          active={editor.getAttributes('image')['data-width'] === '50%'}
          onClick={() => applyToSelectedImage({ width: null, 'data-width': editor.getAttributes('image')['data-width'] === '50%' ? null : '50%' })}
        >
          <Minimize2 className="h-3.5 w-3.5 text-primary/70" />
        </ToolbarButton>
        <ToolbarButton
          title="Image: full width (click image first)"
          active={!editor.getAttributes('image')['data-width']}
          onClick={() => applyToSelectedImage({ width: null, 'data-width': null })}
        >
          <Maximize2 className="h-3.5 w-3.5 text-primary/70" />
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
