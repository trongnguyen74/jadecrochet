import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import supabase from '../../api/Supabase';
import SocialShare from '../../components/SocialShare';
import { Divider } from 'antd';
import parse from 'html-react-parser';

const BlogDetail = () => {
  let {id} = useParams();
  const [blogDetail, setBlogDetail] = useState([]);

  useEffect(() => {
    getBlogDetail();
  }, []);

  async function getBlogDetail() {
    let {data} = await supabase.from('blog').select('*').eq('id', id);
    let result:any = data;
    setBlogDetail(result);
  }

  return (
    <div className="w-full h-full montserrat mt-4 px-4">
      {
        blogDetail.map((row:any) => {
          var clearPost = row.content.split(/\r?\n|\r|\n/g);
          return (
            <div>
              <div className="text-center font-bold text-[26px]">{row.title}</div>
              <div className="text-center text-[#999999]">{row.created_at}</div>
              <div className="mt-6">
                {
                  clearPost.map((p:any) => {
                    if(row === ''){
                      return <div className="w-full">&nbsp;</div>
                    }
                    else{
                      return <div className="w-full">{parse(p)}</div>
                    }
                  })
                }
              </div>
              <Divider />
              <SocialShare />
            </div>
          )
        })
      }
    </div>
  )
}

export default BlogDetail;
