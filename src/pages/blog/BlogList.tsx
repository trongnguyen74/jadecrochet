import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../api/Supabase';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const BlogList = () => {
  const [blogList, setBlogList] = useState<any>([]);

  useEffect(() => {
    getBlogList();
  }, []);

  async function getBlogList() {
    let {data} = await supabase.from('blog').select('*');
    setBlogList(data);
  }

  return (
    <div className="w-full h-fit montserrat">
      {
        (blogList != '') ? (
            blogList.map((row: any) => {
               let titleRequest:string = row.title.toLowerCase().replace(/\s/g, '-')
               return (
                 <Link className="w-full" to={'/blog/' + titleRequest + '/' + row.id}>
                   <div className="w-full p-6 rounded-[6px] bg-[#FFF] hover:bg-[#efdfde]">
                     <span className="font-bold text-[#595959]">{row.title}</span>
                     <br />
                     <span className="text-[#999999] text-[12px]">{row.created_at}</span>
                   </div>
                 </Link>
               )
            })
        ):
        (
          <div className="flex justify-center">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
          </div>
        )
      }
    </div>
  )
}

export default BlogList;
