<template>
	<main class="container">
		<div class="panel panel-info col-xl-12">
			<div class="panel-body">
				<div class="project-create-board m-4">
					<div class="panel panel-success">
						<div class="chat-content-wrapper">
							<div
								v-for="item in getMessagesById(this.id)"
								v-bind:key="item.id"
							>
								<div
									class="one-message"
									v-if="currentUser.uid == item.sender"
								>
									<span class="badge badge-info">Me</span
									><br />
									<span>{{ item.content }}</span>
									<div class="message-date">
										{{ dateFormat(item.messageTime) }}
									</div>
								</div>

								<div
									class="one-message"
									v-else
								>
									<span class="badge badge-warning">Staff</span
									><br />
									<span>{{ item.content }}</span>
									<div class="message-date">
										{{ dateFormat(item.messageTime) }}
									</div>
								</div>
							</div>
						</div>
						<div class="footer-message">
							<input
								type="text"
								class="form-control input-chat"
								placeholder="Place your message here"
								v-model="content"
							/>
							<button
								class="btn btn-info btn-chat"
								type="submit"
								v-on:click.prevent="handleChat"
							>
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { dateFormat } from "../helpers";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
	name: "admin-chat-message",
	data() {
		return {
			id: this.$route.params.id,
			content: "",
			dateFormat,
			messages: null
		};
	},
	computed: {
		...mapGetters(["getMessagesById"]),
		...mapState(["currentUser"]),
	},
	methods: {
		...mapActions(["sendMessage"]),
		handleChat() {
			let data = {
				id: this.id,
				content: this.content,
				sender: this.currentUser.uid,
			};
			this.sendMessage(data).then((resp) => {
				if (resp.isSuccess) {
					this.content = "";
				} else {
					this.$router.push("/");
				}
			});
		}
	},
};
</script>

<style>
</style>