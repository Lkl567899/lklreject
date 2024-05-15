<template>
  <div class="search">
    <van-nav-bar title="商品列表" fixed left-arrow @click-left="$router.go(-1)" />
    <van-search readonly shape="round" background="#ffffff" :value="search || '请输入商品'" @click="$router.push('/search')"
      show-action>
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>
    <div class="sort-btns">
      <div class="sort-item" @click="GetSearchListData('all')">综合</div>
      <div class="sort-item" @click="GetSearchListData('sales')">销量</div>
      <div class="sort-item" @click="GetSearchListData('price')">价格</div>
    </div>
    <div class="goods-list">
      <GoodsItem v-for="item in list" :key="item.goods_id" :item="item"></GoodsItem>
    </div>

  </div>
</template>

<script>
import { GetSearchListAPI } from '@/api/search';
import GoodsItem from '@/components/GoodsItem.vue';

export default {
  components: {
    GoodsItem
  },
  computed: {
    search() {
      return this.$route.query.search
    },
    categoryId() {
      return this.$route.query.categoryId
    }

  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    async GetSearchListData(key) {
      const res = await GetSearchListAPI(this.search, key)
      this.list = res.data.list.data
    }
  },
  created() {
    this.GetSearchListData()
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;

    .sort-item {
      flex: 1;
      text-align: center;
      font-size: 16px;
    }
  }

  // 商品样式
  .goods-list {
    background-color: #f6f6f6;
  }
}
</style>
