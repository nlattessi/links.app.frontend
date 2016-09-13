<template>
  <div>
    <h1>Create Post</h1>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="col-sm-2 control-label">Post title</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="Post title">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">Post body</label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="5"></textarea>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-primary">Create</button>
        </div>
      </div>
    </form>
  </div>
</template>