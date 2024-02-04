import "./add.scss";

const Add = () => {
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title *</label>
            <input
              type="text"
              placeholder="e.g. I will do something I'm really good at"
            />
            <label htmlFor="">Category *</label>
            <select name="cats" id="cats">
              <option value="graphics_and_design">Graphics & Design</option>
              <option value="digital_marketing">Digital Marketing</option>
              <option value="writing_and_transalation">
                Writing & Translation
              </option>
              <option value="video_and_animation">
                Video, Animation & Cinematography
              </option>
              <option value="photogrphy">Photography</option>
              <option value="music_and_audio">Music & Audio</option>
              <option value="prog_and_tech">Programming & Tech</option>
              <option value="business">Business</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="data">Data</option>
              <option value="handmade">Handmade</option>
            </select>
            <label htmlFor="">Cover Image *</label>
            <input type="file" />
            <label htmlFor="">Upload Images *</label>
            <input type="file" multiple />
            <label htmlFor="">Description</label>
            <textarea
              name=""
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
            ></textarea>
            <button>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input type="text" placeholder="e.g. One-page web design" />
            <label htmlFor="">Short Description</label>
            <textarea
              name=""
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" />
            <label htmlFor="">Revision Number</label>
            <input type="number" />
            <label htmlFor="">Add Features</label>
            <input type="text" placeholder="e.g. page design" />
            <input type="text" placeholder="e.g. file uploading" />
            <input type="text" placeholder="e.g. setting up a domain" />
            <input type="text" placeholder="e.g. hosting" />
            <label htmlFor="">Price</label>
            <input type="number" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
