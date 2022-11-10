import React, { useRef } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import styled from "styled-components";
import { Button, Layout, notification } from "antd";
import EditorFroala from "../../components/editorwysiwyg/EditorFroala";
import { api, baseApiUrll } from "../../config/global";

const Container = styled.div `
  cursor: text;
  margin: 20px;

`
const ContainerButton = styled.div `
  min-height: 6em;
  cursor: text;
  margin: 20px;
`
const {Content} = Layout;

const EditPage= () => {
  const editorRef = useRef(null);

  const log = () => {
    api.post(`${baseApiUrll}/articles`, {name: 'Teste vindo do site', content: editorRef.current.getContent(), categoryId : 2, userId: 1})
    .then(() => {
      notification.open({
        message: 'Cadastro De Artigos',
        description:
          'Cadastrado realizado com sucesso!',
      })
    })
    .catch((response) => 
      notification.open({
      message: 'Cadastro De Usuário',
      description: (response.response.data),
    }))
  };

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  return (
    <Content style={{margin: '16px 16px',}}>
      <Container 
        onClick={focusEditor}
      >
        <EditorFroala
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue='<p>This is the initial content of the editor.</p>'
          init={{
            menubar: false,
            plugins: [
              'a11ychecker', 'advcode', 'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen', 'help', 'image', 'editimage', 'tinydrive', 'lists', 'link', 'media', 'powerpaste', 'preview', 'searchreplace', 'table', 'template', 'tinymcespellchecker', 'visualblocks', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | bold italic | forecolor backcolor | template codesample | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | link image' + 'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </Container>
      <ContainerButton>
        <Button onClick={log}>Enviar</Button>
      </ContainerButton>
    </Content>
    
  );
}
export default EditPage