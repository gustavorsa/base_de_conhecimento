import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button, Layout, notification } from "antd";
import EditorFroala from "../../components/editorwysiwyg/EditorFroala";
import { api, baseApiUrll, postArticles } from "../../config/global";
import { useNavigate } from "react-router-dom";
import './EditPage.css'

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';
// DOM model
import 'tinymce/models/dom/model'
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';

// importing plugin resources
import 'tinymce/plugins/emoticons/js/emojis';

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';

const Container = styled.div `
  margin-top: 20px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`
const ContainerText = styled.div `
  cursor: text;
`

const ContainerButton = styled.div `
  min-height: 6em;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: text;
`
const TextArea = styled.div `
  padding: 1em;
  border-radius: 10px;
  border: 2px solid transparent;
  outline: none;
`

const {Content} = Layout;

const EditPage= () => {
  const editorRef = useRef(null);
  const navigate = useNavigate()

  const saveArticle = () => {
    const name = document.getElementById("titleArticle").value
    const content = editorRef.current.getContent()
    const user = JSON.parse(localStorage.getItem("user"))
    /*const buffer = Buffer.from(texto, "ascii")
      if(texto != null) {
      setText(text)//buffer.toString("utf8"))
    }*/
    api.post(`${baseApiUrll}/articles`, {name, content, categoryId : 2, userId: user.id})
    .then(() => {
      notification.open({
        message: 'Cadastro De Artigos',
        description:
          'Cadastrado realizado com sucesso!',
      })
      navigate("/Artigos/commerce")
    })
    .catch((response) => 
      notification.open({
      message: 'Cadastro De Usuário',
      description: (response.response.data),
    }))
  };

  const pegarAlgo = () => {
   
    console.log(user.id)
  }

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  return (
    <Content style={{margin: '16px 16px',}}>
      <Container>
          <textarea name="titleArticle" id="titleArticle" placeholder="Informe um Titulo" className="textAreaTitle">
          </textarea>
        <ContainerText
          onClick={focusEditor}
        >
          <EditorFroala
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue=''
            init={{
              menubar: false,
              plugins: [
                'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen', 'help', 'image', 'lists', 'link', 'media', 'preview', 'searchreplace', 'table', 'template', 'visualblocks',
              ],
              toolbar: 'undo redo | fontfamily | fontsize | blocks | blocks | bold italic | forecolor backcolor | template codesample | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | link image' + 'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              statusbar:false,
              height: 1000,
              placeholder: 'Informe o texto'
            }}
          />
        </ContainerText>
        <ContainerButton>
          <Button onClick={saveArticle}>Enviar</Button>
        </ContainerButton>
      </Container>
    </Content>
    
  );
}
export default EditPage