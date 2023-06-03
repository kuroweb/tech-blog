// common
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// package
import { useFieldExtension } from 'microcms-field-extension-react'

// styles
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

// Markdown Editor for ReactはSSRで利用できないためdynamic importで読み込む必要がある
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <div>loading...</div>,
})

const Page = () => {
  const [markdown, setMarkdown] = useState<string | undefined>()

  // microCMSのフィールド拡張を利用するためのhook
  const { data, sendMessage } = useFieldExtension('', {
    origin: process.env.NEXT_PUBLIC_MICROCMS_ORIGIN,
    height: 542,
  })

  useEffect(() => {
    if (!markdown) {
      setMarkdown(data)
    }
  }, [data, markdown])

  const handleChange = (value: string | undefined) => {
    setMarkdown(value)
    sendMessage({ data: value })
  }

  return (
    <div data-color-mode='light' className='rounded-md border'>
      <MDEditor
        value={markdown}
        onChange={(value) => handleChange(value)}
        height={540}
      />
    </div>
  )
}

export default Page
