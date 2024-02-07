import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import supabase from '../../api/Supabase';

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
    <div className="w-full h-full">
      {
        blogDetail.map((row:any) => {
          var clearPost = row.content.split(/\r?\n|\r|\n/g);
          return <div>
            <div className="text-center font-bold text-[26px]">{row.title}</div>
            <div className="text-center text-[#999999]">{row.created_at}</div>
            <div className="mt-6">
              {
                clearPost.map((row:any) => {
                  if(row === ''){
                    return <div className="w-full">&nbsp;</div>
                  }
                  else{
                    return <div className="w-full">{clearPost}</div>
                  }
                })
              }
            </div>
          </div>
        })
      }
    </div>
  )
}

export default BlogDetail;
